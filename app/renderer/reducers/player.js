import {  PLAYLIST_POSITION,
          GET_TOKEN,
          TEST,
          GET_CHANNELS,
          GET_SCHEDULE,
          SET_CURRENT_CHANNEL,
          GET_TRACK,
          RESET_DOWNLOAD_COUNTER } from '../actions/actionTypes';


export default function playerReducer(state = {
                                                downloadCount: 0
                                              }, action){

  switch (action.type) {
    case PLAYLIST_POSITION:
      return ({
        ...state,
        currentTrack: action.payload
      });
    //add next session for test storage communication between render and main
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
    case GET_SCHEDULE:
          return({
           ...state,
            schedule: action.payload
            });
    case SET_CURRENT_CHANNEL:
          return({
          ...state,
            currentChannel: action.payload
            });
    case GET_TRACK:
          return({
          ...state,
          downloadCount: state.downloadCount + 1
            });
    case RESET_DOWNLOAD_COUNTER:
          return({
          ...state,
          downloadCount: 0
                });
    case TEST:
          return({
            ...state,
            isConnected: action.payload
          });
    default:
      return state;
  }
}
