const {ipcMain} = require('electron');
import { getChannels,
         getSchedule,
         getTrack,
         downloadCountReset,
         downloadStatus } from '../store/actions/action'
import { getToken,
         addDownloadedTrackInArray,
         resetDownloadedTracksArray} from '../store/actions/apiActions'
       

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
          store.dispatch(resetDownloadedTracksArray());
          store.dispatch(getSchedule(api.schedule));
          api.contentDownload(api.schedule[0].playlists[0].tracks);
        });
        api.on('gottrack', (trackID) => {
          store.dispatch(getTrack());
          store.dispatch(addDownloadedTrackInArray(trackID));
          const downloadedTracksArray = store.getState().webapi.downloadedTracks;
          //api.sendDownloadStatus(downloadedTracksArray)
        });
        api.on('loadcompleted', () => {
          store.dispatch(downloadStatus(true));
        })
    }
}


module.exports = MPC;
