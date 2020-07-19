
import { PLAYLIST_POSITION,
         GET_TOKEN,
         GET_CHANNELS } from './actionTypes';


export function setPlaylistPosition(trackName){
  return {
    type: PLAYLIST_POSITION,
    payload: trackName
  }
}

export function getToken(token){
  return {
    type: GET_TOKEN,
    payload: token
  }
}

export function getChannels(channels){
  return {
    type: GET_CHANNELS,
    payload: channels
  }
}
