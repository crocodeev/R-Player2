import raf from 'raf';
import {
    setCurrentTrack,
    setSeekPosition,
    setPlaylist,
    setPlaylistPosition,
    setDownloadAmount
  } from '../../../store/actions/playerActions';

export default function addListenersToSound(soundModule, store) {
    
    soundModule.on('play', () => {
        const name = soundModule.currentTrackName;
        const duration = soundModule.currentTrackDuration;
        console.log("SOUND MODULE INDEX");
        store.dispatch(setCurrentTrack(name, duration));
        store.dispatch(setPlaylistPosition(soundModule.index));
        //raf(renderSeekPos);
      })

      soundModule.once('play', () => {
        raf(renderSeekPos);
      })
      
      /*soundModule.on('end', () => {
        clearRAF();
      })*/
      
      soundModule.on('change', () => {
        const playlist = soundModule.playlist.map(element => element.name)
        store.dispatch(setPlaylist(playlist))
        //reset store current track here
      
        //this at first start only
        store.dispatch(setDownloadAmount(1))
      })
      
      function renderSeekPos(){
        const seek = soundModule.seek();
        store.dispatch(setSeekPosition(seek))
        raf(renderSeekPos);
      }
      
      function clearRAF (){
        raf.cancel(raf)
      }
}