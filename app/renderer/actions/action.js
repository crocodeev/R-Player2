
import { PLAYLIST_POSITION,
         GET_TOKEN,
         GET_CHANNELS,
         GET_SCHEDULE,
         SET_CURRENT_CHANNEL,
         GET_TRACK,
         RESET_DOWNLOAD_COUNTER,
         DOWNLOAD_STATUS,
         SET_PLAYING_STATUS
         } from './actionTypes';


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

export function getSchedule(schedule){
  return {
    type: GET_SCHEDULE,
    payload: schedule
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

export function setPlayingStatus(status){
  return{
    type: SET_PLAYING_STATUS,
    payload: status
  }
}
