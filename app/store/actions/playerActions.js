
import { SET_PLAYLIST_POSITION,
         SET_PLAYLIST,
         GET_TRACK,
         RESET_DOWNLOAD_COUNTER,
         DOWNLOAD_STATUS,
         SET_CURRENT_TRACK,
         SET_SEEK_POSITION} from './actionTypes';


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

export function setGuid(guid) {
  return{
    type: SET_GUID,
    payload: guid
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