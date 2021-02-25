const {ipcMain} = require('electron');
import { getToken,
         getChannels,
         getSchedule,
         getTrack,
         downloadCountReset,
         downloadStatus } from '../renderer/actions/action'

import { push } from 'connected-react-router';

class MPC {

    init(api, store){
        ipcMain.on('test', (event, arg) => {
            console.log(arg);
        });

        ipcMain.on('token', (event, arg) => {
            api.getToken(arg);
        });


        ipcMain.on('schedule', (event, arg) => {
            api.getSchedule(arg);
        });

        ipcMain.on('track', (event, arg) => {
            api.downloadTrack(arg);
        });

        ipcMain.on('guid', (event, arg) => {
            api.guid = arg;
        })

        //listeners section

        api.on('gottoken', () => {
          store.dispatch(getToken(api.token));
          api.getChannels();
        });
        api.on('gotchannels', () => {
          store.dispatch(getChannels(api.channels));
          store.dispatch(push("/player"));
        });
        api.on('gotschedule', () => {
          console.log("got schedule");
          store.dispatch(downloadCountReset());
          store.dispatch(getSchedule(api.schedule));
          api.contentDownload(api.schedule[0].playlists[0].tracks);
        });
        api.on('gottrack', () => {
          store.dispatch(getTrack());
        });
        api.on('loadcompleted', () => {
          store.dispatch(downloadStatus(true));
        })
    }
}


module.exports = MPC;
