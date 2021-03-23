const {ipcMain} = require('electron');
import { getTrack,
         downloadCountReset,
         setDownloadAmount,
         downloadStatus } from '../store/actions/playerActions';
import { setChannelRules, 
         setSchedule,
         setLastModified,
         setNextSchedule} from '../store/actions/scheduleActions';         
import { getToken,
         getChannels,
         addDownloadedTrackInArray,
         resetDownloadedTracksArray} from '../store/actions/apiActions';      
import  createDateStamp from './helpers/createDateStamp';
import  compareDateStamps from './helpers/compareDateStamps';      
import deepcopy from 'deepcopy';
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
            api.channel = arg;
            api.getSchedule();
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

          store.dispatch(setLastModified(createDateStamp()));

          store.dispatch(downloadCountReset());
          store.dispatch(resetDownloadedTracksArray());
          store.dispatch(downloadStatus(false));
          
          store.dispatch(setNextSchedule(schedule));
          store.dispatch(setDownloadAmount(api.schedule.length));
          api.contentDownload(api.schedule);

        });
        api.on('gottrack', (trackID) => {
          store.dispatch(getTrack());
          store.dispatch(addDownloadedTrackInArray(trackID));
        });
        api.on('loadcompleted', () => {
          const schedule = deepcopy(store.getState().schedule.nextSchedule);
          store.dispatch(setSchedule(schedule));
          store.dispatch(downloadStatus(true));
        })
        api.on('lastModified', (lastModified) => {       
          const currentStamp = store.getState().webapi.lastModified
          if(compareDateStamps(currentStamp, lastModified)){
            return;
          }
          store.dispatch(setLastModified(lastModified));
        })
    }
}


module.exports = MPC;
