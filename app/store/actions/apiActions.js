
import { GET_TOKEN,
         GET_CHANNELS,
         SET_CURRENT_CHANNEL,
         RESET_DOWNLOADED_TRACKS,
         ADD_DOWNLOADED_TRACK,
         SET_GUID } from './actionTypes';


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

export function setCurrentChannel(channelId){
return{
type: SET_CURRENT_CHANNEL,
payload: channelId
}
}


export function setGuid(guid) {
return{
type: SET_GUID,
payload: guid
}
}

//как выполнить push в массив в state
export function addDownloadedTrackInArray(track) {
    return{
    type: ADD_DOWNLOADED_TRACK,
    payload: track
    }
    }

export function resetDownloadedTracksArray(track) {
    return{
    type: RESET_DOWNLOADED_TRACKS,
    }
    }    

export function logout() {
    return{
        type: LOGOUT
    }
}