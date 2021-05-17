const { ipcRenderer } = require("electron");


export default class RPC {

    setWindowStateListener(){
        ipcRenderer.on('window-showed', (event, arg) => {
            console.log(arg);
            setTimeout(() => {
              console.log("hide window");  
              this.hideWindow();  
            }, 1500)
        })
    }

    hideWindow(){
        console.log("SEND TO HIDE");
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
