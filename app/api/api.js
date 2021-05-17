const {session} = require('electron');
const fetch = require('electron-fetch').default;
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');
const crypter = require('../utils/crypter');
const isFileExist = require('./helpers/isFileExist').default;
const getAllTracksFromSchedule = require('./helpers/getAllTracksFromSchedule').default;
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);



class Api extends EventEmitter {

    constructor(obj){
        super();
        Object.assign(this,  obj);
        this.isContentDownloading = false;
    }

    /* setting guid after inizialization api module,
    cause initialize api in main process, 
    but guid store in render*/

    set guid(guid){
        this._guid = guid
    }

    set channel(channelId){
        this._channel = channelId
    }
    
    get guid(){
        return this._guid
    }

    async getToken(obj){

        console.log(obj);

        this.id = obj.projectId;
        this.code = obj.playerCode;

        const requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

            try {
                const responce = await fetch(`http://${this.domaiName}/api/account/signin/?id=${this.id}&code=${this.code}&name=${this.name}&guid=${this._guid}`, requestOptions);
                const result =  await responce.json();
                console.log("REQUEST RESULT :" + result.data.token);
                this.token = result.data.token;
                this.setCookies(result.data.token);
                this.emit('gotToken');

            } catch (error) {
                console.log("ERROR :" + error);
            }
    }

    async getChannels(){

        const requestOptions = {
        method: 'GET',
        headers: {
            Cookie: `uid=${this.token}`
        },
        redirect: 'follow'
        };

        try {
            const responce = await fetch(`http://${this.domaiName}/api/channel/getchannels/`, requestOptions);
            const result =  await responce.json();
            this.channels = result.data;

            this.emit('gotChannels');

        } catch (error) {
            console.log(error);
        }
    }

    async getSchedule(){

            const requestOptions = {
            method: 'GET',
            headers: {
                Cookie: `uid=${this.token}`
            },
            redirect: 'follow'
            };

            try {
                const response = await fetch(`http://${this.domaiName}/api/campaign/getschedule/?channel=${this._channel}`, requestOptions);
                const result = await response.json();
                //нужно поменять имена переменных
                const tracks = getAllTracksFromSchedule(result.data)
                this.schedule = tracks; 
                this.emit('gotSchedule', result.data);
            } catch (e) {
                console.log(e);
            }
    }

    contentDownload(trackArray){

        let self = this;
        self.isContentDownloading = true;
        let counter = 0;
  
        (async function download() {
  
          const item = trackArray[counter];
          const name = item.checksum;
          const filePath = path.join(self.storage, name);
          
          const isExist = await isFileExist(filePath);  
  
            try {
                
                if(!self.isContentDownloading){
  
                    self.emit('loadCanceled')
                    return;
                }

                if(isExist){
                  console.log("download skip");  
                  counter++;
                    self.emit('gotTrack', item.id);
                    if(counter < trackArray.length){
                      download();
                    }else{
                      self.emit('loadCompleted');
                    }
                }else{
                  
                  console.log("trying download file");

                  const responce = await fetch(item.url);


                    await pipeline(
                        responce.body, //readable stream
                        crypter.getCipher(), //cipher
                        fs.createWriteStream(filePath) //destination
                      )
                      
                      console.log(name);
                      counter++;
                      self.emit('gotTrack', item.id);
                      if(counter < trackArray.length){
                          download();
                      }else{
                          self.emit('loadCompleted');
                      }
                }
            } catch (error) {
                console.log("ERROR DOWNLOAD: ", error);
                fs.unlink(filePath, (error) => {
                    if(error){
                        console.log(error);
                    }
                    self.emit('disconnected');
                })
            }
          }).apply(self);
    }

    async accountCheck(code){

        if(!this.isPropertyExist("code") ){
            this.code = code
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                Cookie: `uid=${this.token}`
            },
            redirect: 'follow'
            };

        try {
            const responce = await fetch(`http://${this.domaiName}/api/account/check/?code=${this.code}`, requestOptions);
            const result =  await responce.json();

            return result.data

        } catch (error) {
            console.log("ERROR :" + error);
        }    
    }

    async getScheduleLastModified(){

        console.log("getlastModifiedForChannel");
        console.log(this._channel);
        if(!this._channel){
            return;
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                Cookie: `uid=${this.token}`
            },
            redirect: 'follow'
            };

        try {
            const responce = await fetch(`http://${this.domaiName}/api/campaign/getschedulelastmodified?channel=${this._channel}`, requestOptions);
            const result =  await responce.json();
            console.log(result);
            const lastModified = result.data.lastModified;
            
            this.emit('lastModified', lastModified)

        } catch (error) {
            console.log("ERROR LAST MODIFIED:" + error);
        }    
    }

    async sendDownloadStatus(tracksIdsArray){

        const raw = JSON.stringify(tracksIdsArray);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Cookie: `uid=${this.token}`
            },
            body: raw,
            redirect: 'follow'
            };
        
            try {
                const responce = await fetch(`http://${this.domaiName}/api/campaign/tracks/?channel=${this.channel}`, requestOptions);
                //const result =  await responce.json();
    
                console.log(responce.status);
                
            } catch (error) {
                console.log("ERROR FROM sendDownloadStatus:");
                console.log(error.name);
                console.log(error.message);
                console.log(error.stack);
            }         

    }

    async sendPlayReport(data){

        /*
        channel - channel id,
        playlist  - playlist id,
        track - track id,
        from - start date YYYY-MM-DD HH:ii:ss
        to - end date YYYY-MM-DD HH:ii:ss
        */

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Cookie: `uid=${this.token}`
            },
            body: raw,
            redirect: 'follow'
            };

            try {
                const responce = await fetch(`http://${this.domaiName}/api/channel/report`, requestOptions);
                const result =  await responce.json();
    
                return result.data
                
            } catch (error) {
                console.log("ERROR :" + error);
            }      

    }

    async addToBlackList(data){
        /*
        channel_id,
        track_id,
        username,
        comment
         */

        const requestOptions = {
            method: 'POST',
            headers: {
                Cookie: `uid=${this.token}`
            },
            redirect: 'follow'
            };

        try {
            const responce = await fetch(`http://${this.domaiName}/api/channel/blacklist?channel_id=${data.channel_id}&track_id=${data.track_id}&username=${data.username}&comment=${data.comment}`, requestOptions);
            const result =  await responce.json();
    
            return result.data;
                
            } catch (error) {
            console.log("ERROR :" + error);
            }   

    }


    setCookies(data){

        const cookie = { url: `http://${this.domaiName}`,
                         name: 'uid',
                         value: data};            
        session.defaultSession.cookies.set(cookie)
                          .then(() => {
                            this.token = data;
                            this.emit('cookieStored')
                          }, (error) => {
                            console.error(error)
                          })


    }

    //utils
    isPropertyExist(property){
        return( property in this );
    }

    
}


module.exports = Api;
