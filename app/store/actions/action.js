
import { PLAYLIST_POSITION,
         GET_TOKEN,
         GET_CHANNELS,
         GET_SCHEDULE,
         SET_CURRENT_CHANNEL,
         GET_TRACK,
         RESET_DOWNLOAD_COUNTER,
         DOWNLOAD_STATUS,
         SET_GUID, 
         SET_CURRENT_TRACK,
         SET_SEEK_POSITION} from './actionTypes';


export function setPlaylistPosition(trackName){
  return {
    type: PLAYLIST_POSITION,
    payload: trackName
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