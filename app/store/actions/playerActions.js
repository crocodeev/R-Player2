
import { SET_PLAYLIST_POSITION,
         SET_DOWNLOAD_AMOUNT, 
         SET_PLAYLIST,
         GET_TRACK,
         RESET_DOWNLOAD_COUNTER,
         DOWNLOAD_STATUS,
         SET_CURRENT_TRACK,
         SET_SEEK_POSITION,
         LOGOUT} from './actionTypes';


export function setPlaylist(playlist){
  return {
    type: SET_PLAYLIST,
    payload: playlist
  }
}

export function setPlaylistPosition(position){
  return {
    type: SET_PLAYLIST_POSITION,
    payload: position
  }
}

export function getChannels(channels){
  return {
    type: GET_CHANNELS,
    payload: channels
  }
}

export function setCurrentChannel(channelId){
  return{
    type: SET_CURRENT_CHANNEL,
    payload: channelId
  }
}

export function getTrack(){
  return{
    type: GET_TRACK
  }
}

export function setDownloadAmount(amount){
  return{
    type: SET_DOWNLOAD_AMOUNT,
    payload: amount
  }
}

export function downloadCountReset(){
  return{
    type: RESET_DOWNLOAD_COUNTER
  }
}

export function downloadStatus(status){
  return{
    type: DOWNLOAD_STATUS,
    payload: status
  }
}

export function setCurrentTrack(name, duration){
  return{
    type: SET_CURRENT_TRACK,
    payload: {
      name,
      duration
    }
  }
}

export function setSeekPosition(seekPosition) {
  return{
    type: SET_SEEK_POSITION,
    payload: seekPosition
  }
}

export function logout() {
  return{
    type: LOGOUT
  }
}