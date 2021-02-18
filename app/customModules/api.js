const {session} = require('electron');
const fetch = require('electron-fetch').default;
const fs = require('fs');
const { EventEmitter } = require('events');
const crypter = require('../utils/crypter');



class Api extends EventEmitter {

    constructor(obj){
        super();
        Object.assign(this,  obj);
    }

    /* setting guid after inizialization api module,
    cause initialize api in main process, 
    but guid store in render*/

    set guid(guid){
        this._guid = guid
    }
    
    get guid(){
        return this._guid
    }

    async getToken(obj){


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
                this.emit('gottoken');

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

            this.emit('gotchannels');

        } catch (error) {
            console.log(error);
        }
    }

    async getSchedule(channelId){

            const requestOptions = {
            method: 'GET',
            headers: {
                Cookie: `uid=${this.token}`
            },
            redirect: 'follow'
            };

            try {
                const responce = await fetch(`http://${this.domaiName}/api/campaign/getschedule/?channel=${channelId}`, requestOptions);
                const result = await responce.json();
                this.schedule = result.data[0].playlists[0]; //нет проверки данных
                this.emit('gotschedule');
            } catch (e) {
                console.log(e);
            }
    }

    contentDownload(trackArray){

      let self = this;
      let counter = 0;

      (async function download() {

        const item = trackArray[counter];
        const name = item.checksum;

          try {
              const responce = await fetch(item.url);
              const dest = fs.createWriteStream(self.storage + name);
              const cipher = crypter.getCipher()
              responce.body.pipe(cipher).pipe(dest);
              dest.on('close', () => {
                  console.log(name);
                  counter++;
                  self.emit('gottrack');
                  if(counter < trackArray.length){
                    download();
                  }else{
                    self.emit('loadcompleted');
                  }
              });
          } catch (error) {
              console.log(error);

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

    async getScheduleLastModified(channel){

        const requestOptions = {
            method: 'GET',
            headers: {
                Cookie: `uid=${this.token}`
            },
            redirect: 'follow'
            };

        try {
            const responce = await fetch(`http://${this.domaiName}/api/campaign/getschedulelastmodified?channel=${channel}`, requestOptions);
            const result =  await responce.json();

            return result.data.lastModified
            
        } catch (error) {
            console.log("ERROR :" + error);
        }    
    }

    async sendDownloadStatus(channel, tracksIdsArray){

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
                const responce = await fetch(`http://${this.domaiName}/api/campaign/tracks/?channel=${channel}`, requestOptions);
                const result =  await responce.json();
    
                return result.data
                
            } catch (error) {
                console.log("ERROR :" + error);
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
                            this.emit('cookiestored')
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
