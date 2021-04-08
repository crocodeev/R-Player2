const { ipcRenderer } = window.require("electron");


class RPC {

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
