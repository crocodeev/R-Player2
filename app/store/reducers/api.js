import {  GET_TOKEN,
          GET_CHANNELS,
          SET_CURRENT_CHANNEL,
          SET_GUID,
          RESET_DOWNLOADED_TRACKS,
          ADD_DOWNLOADED_TRACK,
          LOGOUT,
          SET_NETWORK_STATUS} from '../actions/actionTypes';


export default function webapi(state = {}, action){

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
case ADD_DOWNLOADED_TRACK:
    return({
    ...state,
    downloadedTracks: [...state.downloadedTracks, action.payload]
          });
case RESET_DOWNLOADED_TRACKS:
    return({
    ...state,
    downloadedTracks: []
          });          
case SET_GUID:
    return({
      ...state,
      guid: action.payload
    })
case SET_NETWORK_STATUS:
    return({
      ...state,
      networkStatus: action.payload
    })    
case LOGOUT:
    return({
      ...state,
      token: "",
      channels: [],
      currentChannel: undefined,
      downloadedTracks: []
      });          
default:
return state;
}
}
