const {Howl, Howler} = require('howler');
const EventEmmitter = require('events');
const decryptSource = require('./sourceDecrypter');
import deepcopy from 'deepcopy';
import { initialApiConfig } from '../../hardcode/initialApiConfig';

const storage = initialApiConfig.storage;

/*
emit
play
end
change
*/

class Sound extends EventEmmitter  {

  constructor(playlist){
    super();
    this.playlist = playlist.map((item) => this.addSourceToPlaylistItem(item));
    this.index = 0
  }

  /* play function create Howl instance
     and start track, on tack end start
     next track in array  */
  async play(index){

    let sound;

    this.index = typeof index === 'number' ? index : this.index;

    const data = this.playlist[this.index];

    console.log("START PLAYING...");
    console.log("INDEX", this.index);
    console.log("INDEX", data);


    if(data.howl){
    
      console.log("HOWL EXIST");
      sound = data.howl;

      sound.on('play', async () => {
        this.emit('play');
        console.log("HOWL EXIST + load next");
        //load next playlist item
        this.playlist[this.index + 1].howl = await this._createHowl(this.playlist[this.index + 1].src) 
      })

      sound.on('end', () => {
        console.log("HOWL EXIST + play next", this.index, this.playlist[this.index]);
        this.emit('end');
  
      })

      sound.on('end', () => {
        this.next();
      })


    }else{

      console.log("CREATE HOWL");
      
      sound = data.howl = await this._createHowl(data.src)

      sound.on('play', async () => {
        this.emit('play');
        //load next playlist item
        this.playlist[this.index + 1].howl = await this._createHowl(this.playlist[this.index + 1].src)
        console.log("CREATE HOWL + load next"); 
      })

      sound.on('end', () => {
        console.log("CREATE HOWL + play next", this.index, this.playlist[this.index]); 
        this.emit('end');
      })

      sound.on('end', () => {
        this.next();
      }, 1)

    
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
    if(this.playlist[this.index].howl){
      if(this.playlist[this.index + 1].howl.playing()){
        this.playlist[this.index + 1].howl.stop();
      }
      this.playlist[this.index + 1].howl.unload();
    }
  }

  reset(){
    this.stop();
    //this.emit('end');
    //this.setNewPlaylist([{name:"Artist - Title"}]);
  }

  next(){
    console.log("NEXT");
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
      return (sound.seek()/60).toFixed(2);
    }
      return 0;
  }

  getDuration(){
    let rawDuration = this.playlist[this.index].howl.duration();
    return (rawDuration/60).toFixed(2);
  }

  getPlaylist(){
    return this.playlist;
  }

  addSourceToPlaylistItem(item){
    item.src = storage + item.checksum;
    return item;
  }

  setNewPlaylist(playlist){
    const withSource = playlist.map((item) => this.addSourceToPlaylistItem(item))
    this.playlist = deepcopy(withSource);
    this.index=0;
    this.emit('change');
  }

  async _createHowl(track){
    const url = await decryptSource(track)
    const howl = new Howl({
      src: url,
      preload: true,
      format: ["mp3", "wave"]
    })
    URL.revokeObjectURL(url)
    return howl
  }

  get currentTrackName () {
    return this.playlist[this.index].name;
  }

  get currentTrackDuration(){
    let rawDuration = this.playlist[this.index].howl.duration();
    return (rawDuration/60).toFixed(2);
  }

}

const sound = new Sound([{name:"Artist - Title"}]);

export default sound;
