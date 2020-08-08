import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import routes from './routes';
import configureStore from './store';
import { replayActionRenderer, getInitialStateRenderer } from 'electron-redux'

//player works
import Sound from './sound/soundEmmiter';
//actions
import {setPlayingStatus} from './actions/action';

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

//create player

const initialPlaylist = typeof store.getState().player.schedule == "undefined" ? [{name:"placeholder"}] : store.getState().player.schedule.tracks;
const sound = new Sound(initialPlaylist);

store.subscribe(()=>{
  const isDownloadCompleted = typeof store.getState().player.downloadCompleted == "undefined" ? false : store.getState().player.downloadCompleted;
  const isPlaying = typeof store.getState().player.isPlaying == "undefined" ? false : store.getState().player.isPlaying;
  console.log("download status:" + isDownloadCompleted);
  console.log("playing status:" + isPlaying);
  if(isDownloadCompleted && !isPlaying){
    sound.setNewPlaylist(store.getState().player.schedule.tracks);
    sound.play();

    store.dispatch(setPlayingStatus(true));
  }
})


const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
  </Provider>,
  rootElement,
);
