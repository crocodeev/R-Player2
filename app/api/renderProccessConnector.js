const { ipcRenderer } = require("electron");
const isDevToolOpen = require("./helpers/isDevToolOpen").default;

export default class RPC {


    setWindowStateListener(){
        ipcRenderer.on('window-showed', () => {
            let self = this;

            function checkUserActivity() {
                setTimeout(function(){
                    if(isDevToolOpen()){
                        checkUserActivity();
                    }else{
                        self.hideWindow();
                    }
                },
                180000)
            }

            checkUserActivity();
        })
    }

    hideWindow(){
        ipcRenderer.send('hide-window');
    }

    testSend(message) {
        ipcRenderer.send('test', message);
    }

    getToken(obj){
        ipcRenderer.send('token', obj);
    }

    getSchedule(channelID){
        ipcRenderer.send('schedule', channelID);
    }

    getTrack(url){
        ipcRenderer.send('track', url);
    }

    setGuid(guid){
        ipcRenderer.send('guid', guid);
    }
   
    changeOnlineStatus(status){
        ipcRenderer.send('online-status-changed', status);
    }

    storeIsReady(arg){
        ipcRenderer.send('store-inited', arg);
    }



}

const rpc = new RPC()

module.exports = rpc;
