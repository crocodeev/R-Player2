const { ipcRenderer, ipcMain } = require("electron");
const isDevToolOpen = require("./helpers/isDevToolOpen").default;
import logout from "./helpers/logout";

export default class RPC {

    setLogoutListener(store, scheduler, sound){
        ipcRenderer.on('logout', () => {
            logout(store, scheduler, sound, this.cancelDownload);
        })
    }

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

    cancelDownload(){
        ipcRenderer.send('cancel-download');
    }

    relaunch(){
        ipcRenderer.send('relaunch');
    }
}

const rpc = new RPC()

module.exports = rpc;
