import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter, routerMiddleware, push } from 'connected-react-router';
import { forwardToMain } from 'electron-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';

//добаляем редюсер
import user from './reducers/user';
import player from './reducers/player';
//добавляем экшены
import userActions from './actions/user';

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    ...userActions,
    push,
  };

  const reducers = {
    forwardToMain,
    router: connectRouter(routerHistory),
    user,
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
