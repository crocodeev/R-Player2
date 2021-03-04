import {  PLAYLIST_POSITION,
          TEST,
          GET_SCHEDULE,
          SET_CURRENT_CHANNEL,
          GET_CHANNELS,
          GET_TRACK,
          RESET_DOWNLOAD_COUNTER,
          DOWNLOAD_STATUS,
          SET_CURRENT_TRACK,
          SET_SEEK_POSITION} from '../actions/actionTypes';


export default function playerReducer(state = {}, action){

  switch (action.type) {
    case PLAYLIST_POSITION:
      return ({
        ...state,
        currentTrack: action.payload
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
    case DOWNLOAD_STATUS:
          return({
          ...state,
          downloadCompleted: action.payload
                });
    case SET_CURRENT_TRACK:
          return({
          ...state,
          currentTrack: action.payload
          });
    case SET_SEEK_POSITION:
          return({
          ...state,
          currentTrack: { ...state.currentTrack, seek: action.payload}
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
