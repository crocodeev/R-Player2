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

}

const rpc = new RPC()

module.exports = rpc;
