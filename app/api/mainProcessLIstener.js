const {ipcMain} = require('electron');
import { getTrack,
         downloadCountReset,
         setDownloadAmount,
         downloadStatus } from '../store/actions/playerActions';
import { setChannelRules, setSchedule} from '../store/actions/scheduleActions';         
import { getToken,
         getChannels,
         addDownloadedTrackInArray,
         resetDownloadedTracksArray} from '../store/actions/apiActions';
       

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
        api.on('gotschedule', (schedule) => {
          console.log("got schedule");
          
          store.dispatch(downloadCountReset());
          store.dispatch(resetDownloadedTracksArray());
          store.dispatch(setSchedule(schedule));
      
          store.dispatch(setDownloadAmount(api.schedule[0].playlists[0].tracks.length))
          api.contentDownload(api.schedule[0].playlists[0].tracks);
        });
        api.on('gottrack', (trackID) => {
          store.dispatch(getTrack());
          store.dispatch(addDownloadedTrackInArray(trackID));
        });
        api.on('loadcompleted', () => {
          store.dispatch(downloadStatus(true));
        })
    }
}


module.exports = MPC;
