const {Howl, Howler} = require('howler');
const EventEmmitter = require('events');
const raf = require('raf');
import { initialApiConfig } from '../../hardcode/initialApiConfig'

const storage = initialApiConfig.storage;

class Sound extends EventEmmitter  {

  constructor(playlist){
    super();
    this.playlist = playlist.map((item) => this.addSourceToPlaylistItem(item));
    this.index = 0
  }

  /* play function create Howl instance
     and start track, on tack end start
     next track in array  */
  play(index){

    let sound;

    this.index = typeof index === 'number' ? index : this.index;

    const data = this.playlist[this.index];

    if(data.howl){
      sound = data.howl;

    }else{
      sound = data.howl = new Howl(
        {
          src: data.src,
          onplay: () => {
            const currentTrackName = this.playlist[this.index].name;
            this.emit('play', currentTrackName);
          },
          onend: () => {
            this.emit('end');
            this.next();
          },
          onseek:() => {

          }
        }
      );
    }
      sound.play();
      //this.index = index;
  }

  next(){
    const index = this.index + 1;

    if (this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
    }
    
    this.play(index);
  }

  seek(){
    const sound = this.playlist[this.index].howl
    if(sound.playing()){
      return (sound.seek()/60).toFixed(2);
    }
  }

  getDuration(){
    let rawDuration = this.playlist[this.index].howl.duration()
    return (rawDuration/60).toFixed(2);
  }

  getPlaylist(){
    return this.playlist;
  }

  addSourceToPlaylistItem(item){
    item.src = storage + item.name;
    return item;
  }

  setNewPlaylist(playlist){
    this.playlist = playlist.map((item) => this.addSourceToPlaylistItem(item))
    this.index=0;
  }


}

const sound = new Sound([{name:"placeholder"}]);

export default sound;
