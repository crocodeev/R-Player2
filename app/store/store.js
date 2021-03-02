import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter, routerMiddleware, push } from 'connected-react-router';
import { forwardToMain } from 'electron-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
//for develop
//import logger from 'redux-logger';

//add reducers
import player from './reducers/player';
import webapi from './reducers/api'
//add actions
//import userActions from './actions/user';

// return store
export default function configureStore(initialState, routerHistory) {

  //sync react router with state
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    //...userActions,
    push,
  };

  const reducers = {
    forwardToMain,
    router: connectRouter(routerHistory),
    webapi,
    player
  };

  //const middlewares = [thunk, router, logger];
  const middlewares = [thunk, router];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
