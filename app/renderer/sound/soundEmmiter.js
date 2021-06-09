const {Howl, Howler} = require('howler');
const EventEmmitter = require('events');
const decryptSource = require('./sourceDecrypter');
const path = require('path');
import deepcopy from 'deepcopy';
import { object } from 'prop-types';
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
        
        //load next playlist item and check is item exist
        if(!!this.playlist[this.index + 1]){
          this.playlist[this.index + 1].howl = await this._createHowl(this.playlist[this.index + 1]);
        }
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
        if(!!this.playlist[this.index + 1]){
          this.playlist[this.index + 1].howl = await this._createHowl(this.playlist[this.index + 1]);
        }
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
    this.unloadSlot(this.index);
    this.unloadSlot(this.index +1);
    Howler.unload();

  }

  unloadSlot(index){
    if(this.playlist[index] && this.playlist[index].howl){
      this.playlist[index].howl.stop()
      this.playlist[index].howl.unload();
      delete this.playlist[index].howl;
    }
  }

  cancelAutomaticPlayNext(){
    if(this.playlist[this.index].howl){
      this.playlist[this.index].howl._onend.splice(0,1)
      }
    }


  next(){

    const index = this.index + 1;

    if(this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
      this.playlist[this.index].howl.unload();
      delete this.playlist[this.index].howl
    }

    if(!!this.playlist[index]){
      this.play(index);
    }
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
          if(playlist.constructor !== Array){
            console.log(playlist);
            console.log("NOT ARRAY");
            this.playlist.splice(index, this.playlist.length, deepcopy(playlist));
          }else{
            console.log("IT IS ARRAY");
            this.playlist.splice(index, this.playlist.length, ...deepcopy(playlist));
          }
          this.emit('change');
          console.timeEnd("NEW PLAYLIST REPLACE");
          break;
        default:
          throw new Error("inccorrect interraction type");
      }
  }

  async _createHowl(item){
    console.time("LOAD TRACK");
    const trackPath = path.join(storage, item.checksum);
    console.log("TrackPath is ", trackPath);
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
