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
import  compareDateStamps from './helpers/compareDateStamps';  
import  createReqularRequest from './helpers/createReqularRequest';
import { initialApiConfig } from '../hardcode/initialApiConfig';    
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

        ipcMain.once('store-inited', (event, arg) => {
          api.channel = arg.channel;
          api.setCookies(arg.token);
          const reqularLastModified = createReqularRequest(() => {
            api.getScheduleLastModified(); 
          }, initialApiConfig.lastModifiedInterval)
        })

        //listeners section

        api.on('gotToken', () => {
          store.dispatch(getToken(api.token));
          api.getChannels();
        });
        api.on('gotChannels', () => {
          store.dispatch(getChannels(api.channels));
          store.dispatch(push("/player"));
        });
        api.on('gotSchedule', (schedule) => {

          if(api.isContentDownloading){
            api.isContentDownloading = false;
            api.once('loadCanceled', () => {
              store.dispatch(downloadCountReset());
              store.dispatch(resetDownloadedTracksArray());
              store.dispatch(downloadStatus(false));
          
              store.dispatch(setNextSchedule(schedule));
              store.dispatch(setDownloadAmount(api.schedule.length));
              api.contentDownload(api.schedule);
            })
          }else{
            store.dispatch(downloadCountReset());
            store.dispatch(resetDownloadedTracksArray());
            store.dispatch(downloadStatus(false));
          
            store.dispatch(setNextSchedule(schedule));
            store.dispatch(setDownloadAmount(api.schedule.length));
            api.contentDownload(api.schedule);
          }
        });
        api.on('gotTrack', (trackID) => {
          store.dispatch(getTrack());
          store.dispatch(addDownloadedTrackInArray(trackID));
        });
        api.on('loadCompleted', () => {
          api.isContentDownloading = false;
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
        api.on('disconnected', () => {
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DISCONNECTED!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          ipcMain.once('online-status-changed', (event, arg) => {
            console.log("ARG FROM Online status", arg);
            if(arg){
              store.dispatch(downloadCountReset());
              store.dispatch(resetDownloadedTracksArray());
              store.dispatch(downloadStatus(false));
              //store.dispatch(setNextSchedule(schedule));
              //store.dispatch(setDownloadAmount(api.schedule.length));
              api.contentDownload(api.schedule);
            }
          })
        })
    }
}


module.exports = MPC;
