const {Howl, Howler} = require('howler');
const Crypter = require('../../utils/crypter');

const crypter = new Crypter();

import { initialApiConfig } from '../../hardcode/initialApiConfig'


const storage = initialApiConfig.storage;

class Sound  {

  constructor(playlist){

    this.playlist = playlist.map((item) => this.addSourceToPlaylistItem(item));
    this.index = 0
  }

  addSourceToPlaylistItem(item){
    item.src = storage + item.name;
    return item;
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

      const buffer = 
      /*
      this we need
      1. read file
      2. decode to buffer
      3. create URL from buffer
      4. create Howl
      5. release URL
      */

      sound = data.howl = new Howl(
        {
          src: data.src,
          onplay: () => {
            const currentTrackName = this.playlist[this.index].name;
            this.emit('play', currentTrackName);
          },
          onend: () => {
            this.next();
          }
        }
      );
    }
      sound.play();
      //this.index = index;
  }

  next(){

    let index = this.index + 1;

    if (this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
    }

    this.play(index);

  }

  setNewPlaylist(playlist){
    console.time("SET NEW PALYLIST");
    this.playlist = playlist;
    this.index = 0
    console.timeEnd("SET NEW PALYLIST");
  }



}


export default Sound;
