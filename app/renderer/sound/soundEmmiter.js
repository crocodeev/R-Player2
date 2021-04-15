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

  
    if(data.howl){
    
      sound = data.howl;

      sound.on('play', async () => {
        this.emit('play');
        //load next playlist item
        this.playlist[this.index + 1].howl = await this._createHowl(this.playlist[this.index + 1].src) 
      })

      sound.on('end', () => {
        this.next();
      })

      sound.on('end', () => {
        this.emit('end');
      })


    }else{

      console.time("CREATE HOWL");
      
      sound = data.howl = await this._createHowl(data.src)

      sound.on('play', async () => {
        this.emit('play');
        //load next playlist item
        this.playlist[this.index + 1].howl = await this._createHowl(this.playlist[this.index + 1].src)
        console.timeEnd("CREATE HOWL");
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
