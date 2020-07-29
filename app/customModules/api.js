const {session} = require('electron');
const fetch = require('electron-fetch').default;
const fs = require('fs');
const { EventEmitter } = require('events');

class Api extends EventEmitter {

    constructor(obj){
        super();
        Object.assign(this,  obj);

    }

    async getToken(obj){

        this.id = obj.projectId;
        this.code = obj.playerCode;

        const requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

            try {
                const responce = await fetch(`http://${this.domaiName}/api/account/signin/?id=${this.id}&code=${this.code}&name=${this.name}&guid=${this.guid}`, requestOptions);
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

        let requestOptions = {
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

    async contentDownload(trackArray){

      for(const item of trackArray){

         const name = item.name;
            try {
                const responce = await fetch(item.url);
                const dest = fs.createWriteStream(this.storage + name);
                responce.body.pipe(dest);
                dest.on('close', () => {
                    this.emit('gottrack');
                });
            } catch (error) {
                console.log(error);

            }

      }
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
