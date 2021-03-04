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
import { setGuid } from '../store/actions/action';
import rpc from '../api/renderProccessConnector';

//this is for player to store part
import raf from 'raf';
import {
  setCurrentTrack,
  setSeekPosition
} from '../store/actions/action'

//this for the test purpose only
const soundModule = sound

const syncHistoryWithStore = (store, history) => {
  const { router } = store.getState();
  if (router && router.location) {
    history.replace(router.location);
  }
};

const initialState = getInitialStateRenderer();
console.log("initial state from getInitialStateRenderer");
console.log(initialState);

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
  raf(renderSeekPos);
})

soundModule.on('end', () => {
  clearRAF();
})

function renderSeekPos(){
  const seek = soundModule.seek();
  store.dispatch(setSeekPosition(seek))
  raf(renderSeekPos);
}

function clearRAF (){
  raf.cancel(raf)
}



const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
  </Provider>,
  rootElement,
);
