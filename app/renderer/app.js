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
console.log("Router history");
console.log(routerHistory);
const store = configureStore(initialState, routerHistory);

replayActionRenderer(store);
syncHistoryWithStore(store, routerHistory);

//generate guid, if need
console.log("store");
console.log(store);
console.log("state");
console.log(store.getState());
rpc.setGuid("Only test function")
if ("guid" in  store.getState().api){
  rpc.setGuid(store.getState().api.guid);
}else{
  const uuid = UUID.genV4();
  store.dispatch(setGuid(uuid.hexNoDelim));
  rpc.setGuid(store.getState().api.guid);
}



const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
  </Provider>,
  rootElement,
);
