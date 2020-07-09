import {  PLAYLIST_POSITION,
          TRACK_POSITION } from '../actions/actionTypes';


export default function playerReducer(state = initialState, action){
  switch (action.type) {
    case PLAYLIST_POSITION:
      return ({
        ...state,
        currentTrack: action.payload
      });
    default:
      return state;
  }
}
