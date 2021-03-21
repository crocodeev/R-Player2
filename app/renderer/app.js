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

//store, add subscribers

let watchScheduleChange = watch(store.getState, 'schedule.schedule', isEqual);

store.subscribe(watchScheduleChange(
  (newValue, oldValue, objectPath) => {
    console.log(newValue);
    console.log(oldValue);
    console.log(objectPath);

  }
))

//check for files
//work with scheduler
 //set initial playlist, on start playlist in always empty
const initialPlaylist = [{name:"Artist - Title"}];
sound.setNewPlaylist(initialPlaylist);

//check is schedule exist, if yes - handle it

const schedule = store.getState().schedule.schedule;

if(Boolean(schedule)){
  console.log("Schedule exist");
}




const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
  </Provider>,
  rootElement,
);
