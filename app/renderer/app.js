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
import addListenersToSound from './helpers/atStartUp/addListenersToSound';
import addListenerToOnlineStatus from './helpers/atStartUp/addListenerToOnlineStatus';


//for test
window.sound = sound

import {
  setChannelTime
} from '../store/actions/scheduleActions'

import {
  logout
} from '../store/actions/playerActions'

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

//network status listeners
addListenerToOnlineStatus(rpc, store);
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
addListenersToSound(sound, store);

//initial sheduler module

const scheduler = new Scheduler(sound);

const channelRule = store.getState().schedule.channelRule;

if(channelRule){
  scheduler.channelRule = channelRule;
}

//store, add subscribers

let watchScheduleChange = watch(store.getState, 'schedule.schedule', isEqual);
let watchChannelChange = watch(store.getState, 'schedule.channelRule', isEqual);
let watchLastModified = watch(store.getState, 'schedule.lastModified');
let watchDownloadCompleted = watch(store.getState, 'player.downloadCompleted');
let watchRouterLocation = watch(store.getState, 'router.location.pathname');

store.subscribe(watchRouterLocation(
  (newState, oldState) => {
    if(newState != oldState && newState === "/"){
      store.dispatch(logout());
    }
  }
));

store.subscribe(watchDownloadCompleted(
  (newState) => { 
    //if switch status to true
    if(newState){
      const schedule = store.getState().schedule.schedule;
      scheduler.clearTaskQueue();
      scheduler.createTasks(schedule);
    }
  }
));


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
));

store.subscribe(watchChannelChange(
  (channelRule) => {
    scheduler.channelRule = channelRule;
  } 
));

/*store.subscribe(watchScheduleChange(
  (schedule) => {
  scheduler.createTasks(schedule);
  }
))*/



//check is schedule exist, if yes - handle it
{
const schedule = store.getState().schedule.schedule;

if(schedule){
   //scheduler.createTasks(schedule);
}
}



const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
  </Provider>,
  rootElement,
);
