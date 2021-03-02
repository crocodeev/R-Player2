import {  GET_TOKEN,
          GET_CHANNELS,
          SET_CURRENT_CHANNEL,
          SET_GUID,
          RESET_DOWLOADED_TRACKS,
          ADD_DOWLOADED_TRACK} from '../actions/actionTypes';


export default function apiReducer(state = {}, action){

switch (action.type) {
case GET_TOKEN:
return({
  ...state,
  token: action.payload
});
case GET_CHANNELS:
    return({
      ...state,
      channels: action.payload
    });
case SET_CURRENT_CHANNEL:
    return({
    ...state,
      currentChannel: action.payload
      });
case ADD_DOWLOADED_TRACK:
    return({
    ...state,
    downloadedTracks: [...state.api.downloadedTracks, action.payload]
          });
case RESET_DOWLOADED_TRACKS:
    return({
    ...state,
    downloadedTracks: []
          });          
case SET_GUID:
    return({
      ...state,
      guid: action.payload
    })      
default:
return state;
}
}
