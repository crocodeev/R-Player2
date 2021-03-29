import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import routes from './routes';
import configureStore from '../store/store';
import { replayActionRenderer, getInitialStateRenderer } from 'electron-redux' 
import sound from './sound/soundEmmiter';
import UUID from 'uuidjs';
import { setGuid } from '../store/actions/apiActions';
import rpc from '../api/renderProccessConnector';
//subscribe to store changes
import watch from 'redux-watch';
import isEqual from 'is-equal';
import Scheduler from './scheduler/scheduler';
import createLastModifiedRequest from './helpers/createLastModifiedRequest';
import setLastModified from './helpers/createDateStamp';


//this is for player to store part
import raf from 'raf';
import {
  setCurrentTrack,
  setSeekPosition,
  setPlaylist,
  setPlaylistPosition,
  setDownloadAmount
} from '../store/actions/playerActions'

import {
  setChannelTime
} from '../store/actions/scheduleActions'

import { element, object } from 'prop-types';

//this for the test purpose only
const soundModule = sound

const syncHistoryWithStore = (store, history) => {
  const { router } = store.getState();
  if (router && router.location) {
    history.replace(router.location);
  }
};

const initialState = getInitialStateRenderer();

const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);

replayActionRenderer(store);
syncHistoryWithStore(store, routerHistory);

//set channel and token to api on start
createLastModifiedRequest(store, rpc.storeIsReady);
//set lastModified at very first start
setLastModified(store)

//guid works
if ("guid" in  store.getState().webapi){
  rpc.setGuid(store.getState().webapi.guid);
}else{
  const uuid = UUID.genV4();
  store.dispatch(setGuid(uuid.hexNoDelim));
  rpc.setGuid(store.getState().webapi.guid);
}

//add listeners to sound module, to change store
soundModule.on('play', () => {
  const name = soundModule.currentTrackName;
  const duration = soundModule.currentTrackDuration;
  store.dispatch(setCurrentTrack(name, duration));
  store.dispatch(setPlaylistPosition(soundModule.index));
  raf(renderSeekPos);
})

soundModule.on('end', () => {
  clearRAF();
})

soundModule.on('change', () => {
  const playlist = soundModule.playlist.map(element => element.name)
  store.dispatch(setPlaylist(playlist))
  //reset store current track here

  //this at first start only
  store.dispatch(setDownloadAmount(1))
})

function renderSeekPos(){
  const seek = soundModule.seek();
  store.dispatch(setSeekPosition(seek))
  raf(renderSeekPos);
}

function clearRAF (){
  raf.cancel(raf)
}
//initial sheduler module

const scheduler = new Scheduler(soundModule);

const channelRule = store.getState().schedule.channelRule;

if(channelRule){
  scheduler.channelRule = channelRule;
}

//store, add subscribers

let watchScheduleChange = watch(store.getState, 'schedule.schedule', isEqual);
let watchChannelChange = watch(store.getState, 'schedule.channelRule', isEqual);
let watchLastModified = watch(store.getState, 'schedule.lastModified');
let watchDownloadCompleted = watch(store.getState, 'player.downloadCompleted');

store.subscribe(watchDownloadCompleted(
  (newState) => { 
    //if switch status to true
    if(newState){
      const schedule = store.getState().schedule.schedule;
      sound.once('end', () => {
        soundModule.reset();
        scheduler.clearTaskQueue();
        scheduler.createTasks(schedule);
      })
    }
  }
))

store.subscribe(watchLastModified(
  (newState, oldState) => { 
    if(!oldState){
      console.log("first start");
    }
    if(newState > oldState){
      console.log("request for new schedule");
      const channelID = store.getState().webapi.currentChannel;
      rpc.getSchedule(channelID);
    }
  }
))

store.subscribe(watchChannelChange(
  (channelRule) => {
    scheduler.channelRule = channelRule;
  } 
))

/*store.subscribe(watchScheduleChange(
  (schedule) => {
  scheduler.createTasks(schedule);
  }
))*/


//check for files
//work with scheduler
//set initial playlist, on start playlist in always empty
const initialPlaylist = [{name:"Artist - Title"}];
sound.setNewPlaylist(initialPlaylist);

//check is schedule exist, if yes - handle i
const schedule = store.getState().schedule.schedule;
if(schedule){
   scheduler.createTasks(schedule);
}



const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
  </Provider>,
  rootElement,
);
