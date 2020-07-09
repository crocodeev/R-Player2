import { PLAYLIST_POSITION,
         TRACK_POSITION } from './actionTypes';

export function setPlaylistPosition(trackName){
  return {
    type: PLAYLIST_POSITION,
    payload: trackName
  }
}
