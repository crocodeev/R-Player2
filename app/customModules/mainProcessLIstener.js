const {ipcMain} = require('electron');
import { getToken,
         getChannels,
         getSchedule } from '../renderer/actions/action'

import { push } from 'connected-react-router';

class MPC {

    init(api, store){
        ipcMain.on('test', (event, arg) => {
            console.log(arg);
            store.dispatch(
              {
                type:"TEST",
                payload: arg
              }
            )
        });

        ipcMain.on('token', (event, arg) => {
            api.getToken(arg);
            api.on('gottoken', () => {
                store.dispatch(getToken(api.token));
                api.getChannels();
            });
            api.on('gotchannels', () => {
              store.dispatch(getChannels(api.channels));
              store.dispatch(push("/player"));
            })
        });

        ipcMain.on('schedule', (event, arg) => {
            api.getSchedule(arg);
            api.on('gotschedule', () => {
                console.log(api.schedule);
                store.dispatch(getSchedule(api.schedule));
            });
        });

        ipcMain.on('track', (event, arg) => {
            api.downloadTrack(arg);
            api.on('gottrack', () => {
                event.reply('track-reply', "fileWrote");
            });
        });
    }
}


module.exports = MPC;
