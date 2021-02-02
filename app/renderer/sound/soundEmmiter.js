const {Howl, Howler} = require('howler');
const EventEmmitter = require('events');
const decryptSource = require('./sourceDecrypter');
const raf = require('raf');
import { initialApiConfig } from '../../hardcode/initialApiConfig';


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
  async play(index){

    let sound;

    this.index = typeof index === 'number' ? index : this.index;

    const data = this.playlist[this.index];

   /* console.log(this.index);
    console.log("data");
    console.log(data);
    console.log(data.howl);*/


    if(data.howl){
    
      sound = data.howl;

      /*sound.on('play', async () => {

        const currentTrackName = this.playlist[this.index].name;
        this.emit('play', currentTrackName);

        const url = await decryptSource(this.playlist[this.index + 1].src)

        this.playlist[this.index + 1].howl = new Howl({
          src: url,
          preload: true,
          format: ["mp3", "wave"]
        });

      })

      sound.on('end', ()=>{
        this.emit('end');
        this.next();
      })*/

    }else{

      const url = await decryptSource(data.src)

      sound = data.howl = new Howl(
        {
          src: url,
          preload: true,
          format: ["mp3", "wave"],

          onplay: async () => {
            const currentTrackName = this.playlist[this.index].name;
            this.emit('play', currentTrackName);

            /*const url = await decryptSource(this.playlist[this.index + 1].src);
            
            this.playlist[this.index + 1].howl = new Howl({
              src: url,
              preload: true,
              format: ["mp3", "wave"]
            });*/
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
      URL.revokeObjectURL(url)
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
    /*console.log("get duration");
    console.log(this.index);
    console.log(this.playlist[this.index]);*/
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
    this.playlist = playlist.map((item) => this.addSourceToPlaylistItem(item))
    this.index=0;
  }


}

const sound = new Sound([{name:"placeholder"}]);

export default sound;
