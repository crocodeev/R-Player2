const {Howl, Howler} = require('howler');

class Sound  {

  constructor(playlist){
    this.playlist = playlist;
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



}


export default Sound;
