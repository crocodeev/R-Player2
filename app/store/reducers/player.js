import {  SET_PLAYLIST,
          SET_PLAYLIST_POSITION,
          SET_DOWNLOAD_AMOUNT,
          TEST,
          GET_TRACK,
          RESET_DOWNLOAD_COUNTER,
          DOWNLOAD_STATUS,
          SET_CURRENT_TRACK,
          SET_SEEK_POSITION} from '../actions/actionTypes';


export default function playerReducer(state = {
  playlist:["Artist - Title"],
  currentTrack: {
    name: "Artist - Title",
    duration: "0.00",
    seek:"0.00"
  }
}, action){

  switch (action.type) {
    case SET_PLAYLIST_POSITION:
      return ({
        ...state,
        playlistPosition: action.payload
      });
    case SET_PLAYLIST:
      return ({
        ...state,
        playlist: action.payload
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
    case SET_DOWNLOAD_AMOUNT:
          return({
          ...state,
          downloadAmount: action.payload  
          })            
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
