const {ipcMain} = require('electron');
import { getToken,
         getChannels } from '../renderer/actions/action'

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
            })
        });

        ipcMain.on('schedule', (event, arg) => {
            api.getSchedule(arg);
            api.on('gotschedule', () => {
                event.reply('schedule-reply', api.schedule);
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
