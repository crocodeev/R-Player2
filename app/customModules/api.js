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

    async contentDownload1(trackArray){

        for await (const item of trackArray){

         const name = item.name;
         let index = 1;
            try {
                const responce = await fetch(item.url);
                const dest = await fs.createWriteStream(this.storage + name);
                responce.body.pipe(dest);
                dest.on('close', () => {
                    console.log(index + " " + name);
                    index++;
                    this.emit('gottrack');
                });
            } catch (error) {
                console.log(error);

            }

      }

      console.log("loop completed");

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



    async downloadTrackBuffer(obj){
        const name = obj.name;
            try {
                const responce = await fetch(obj.url);
                const dest = fs.createWriteStream(this.storage + name);
                responce.body.pipe(dest);
                dest.on('close', () => {
                    console.log("file success wrote");
                    this.emit('gottrack');
                });
            } catch (error) {
                console.log(error);

            }

    }


    downloadTracks(){

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

    /*getCookies(coockieName, callback){
        session.defaultSession.cookies.get({name: data})
                        .then((cookies) => {
                            callback
                        }).catch((error) => {
                            console.log(error)
                        })

    }*/

}


module.exports = Api;
