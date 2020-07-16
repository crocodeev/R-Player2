import {  PLAYLIST_POSITION,
          TEST } from '../actions/actionTypes';


export default function playerReducer(state = {}, action){

  switch (action.type) {
    case PLAYLIST_POSITION:
      return ({
        ...state,
        currentTrack: action.payload
      });
    //add next session for test storage communication between render and main
    case TEST:
      return({
        ...state,
        isConnected: action.payload
      });
    default:
      return state;
  }
}
