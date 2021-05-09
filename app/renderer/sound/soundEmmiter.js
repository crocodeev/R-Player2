const {Howl, Howler} = require('howler');
const EventEmmitter = require('events');
const decryptSource = require('./sourceDecrypter');
const path = require('path');
import deepcopy from 'deepcopy';
import { initialApiConfig } from '../../hardcode/initialApiConfig';

const storage = initialApiConfig.storage;

const playlistInteractionTypes = {
  INSERT:"INSERT",
  REPLACE: "REPLACE"
}

/*
emit
play
end
change
*/

class Sound extends EventEmmitter  {

  constructor(playlist){
    super();
    this.playlist = playlist;
    this.index = 0
  }

  /* play function create Howl instance
     and start track, on tack end start
     next track in array  */
  async play(index){

    console.time("PLAY");

    let sound;

    this.index = typeof index === 'number' ? index : this.index;

    const data = this.playlist[this.index];

  
    if(data.howl){
    
      sound = data.howl;

      sound.on('play', async () => {
        console.timeEnd("PLAY");
        
        //load next playlist item
        this.playlist[this.index + 1].howl = await this._createHowl(this.playlist[this.index + 1]);
        this.emit('play');

      })

      sound.on('end', () => {
        this.next();
      })

      sound.on('end', () => {
        this.emit('end');
      })


    }else{
      
      sound = data.howl = await this._createHowl(data)

      sound.on('play', async () => {
        console.timeEnd("PLAY");
        this.emit('play');
        //load next playlist item
        this.playlist[this.index + 1].howl = await this._createHowl(this.playlist[this.index + 1])
      })

      sound.on('end', () => {
        this.next();
      })

      sound.on('end', () => {
        this.emit('end');
      })
    
    }

    sound.play()

  }

  stop(){
  
    //stop and unload current slot
    if(this.playlist[this.index].howl){
      this.playlist[this.index].howl.stop();
      this.playlist[this.index].howl.unload();
    }
    //stop and unload next slot
    if(this.playlist[this.index + 1] && this.playlist[this.index + 1].howl){
      this.playlist[this.index + 1].howl.stop()
      this.playlist[this.index + 1].howl.unload();
    }
  }


  next(){

    const index = this.index + 1;

    if (this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
      this.playlist[this.index].howl.unload();
      delete this.playlist[this.index].howl
    }
    
    this.play(index);
  }

  seek(){
    const sound = this.playlist[this.index].howl
    if(sound && sound.playing()){
      return Math.floor(sound.seek())
    }
      return 0;
  }

  getPlaylist(){
    return this.playlist;
  }


  static get playlistInteractionTypes(){
    return playlistInteractionTypes;
  }

  setNewPlaylist(playlist, type, index = 0){

      switch (type) {
        case playlistInteractionTypes.INSERT:
          console.time("NEW PLAYLIST INSERT") 
          this.playlist.splice(index, 0, deepcopy(playlist));
          this.emit('change');
          console.timeEnd("NEW PLAYLIST INSERT");
          break;
        case playlistInteractionTypes.REPLACE:
          console.time("NEW PLAYLIST REPLACE") 
          this.playlist.splice(index, this.playlist.length, ...deepcopy(playlist));
          this.emit('change');
          console.timeEnd("NEW PLAYLIST REPLACE");
          break;
        default:
          throw new Error("inccorrect interraction type");
          break;
      }
  }

  async _createHowl(item){
    console.time("LOAD TRACK");
    const trackPath = path.join(storage, item.checksum);
    const url = await decryptSource(trackPath);
    const howl = new Howl({
      src: url,
      preload: true,
      format: ["mp3", "wave"]
    })
    URL.revokeObjectURL(url);
    console.timeEnd("LOAD TRACK");
    return howl
  }



  unloadSlot(index){
    if(this.playlist[index] && this.playlist[index].howl){
      this.playlist[index].howl.stop()
      this.playlist[index].howl.unload();
    }
  }

  cancelAutomaticPlayNext(){
    if(this.playlist[this.index].howl){
      this.playlist[this.index].howl._onend.splice(0,1)
      }
    }

  get isPlaying(){
    if(this.playlist[this.index].howl){
      return this.playlist[this.index].howl.playing();
    }else{
      return false;
    }
  }  

  get currentTrackName () {
    return this.playlist[this.index].name;
  }

  get currentTrackDuration(){
    let rawDuration = this.playlist[this.index].howl.duration();
    return (rawDuration).toFixed();
  }

}

const sound = new Sound([{name:"Artist - Title"}]);

export default sound;
