import React, { Component } from 'react';
import CurrentTrack from './CurrentTrack';
import raf from 'raf';

//sound works
import tracks from '../../hardcode/tracks';
import Sound from '../sound/soundEmmiter';
const sound = new Sound(tracks);



export default class Player extends Component {

  //нужно перенести state в store
  constructor(props) {
    super(props);
    this.state = {
      seek: 0,
      isPlaying: true
    }
    this.renderSeekPos = this.renderSeekPos.bind(this);
  }

  componentDidMount(){
    sound.on('play', (trackName) => {
      console.log(trackName);
      this.setState({isPlaying: true});
      this.props.track(trackName);
      //здесь начинаем отслеживать текущее время
      this.renderSeekPos();
    } )
  }

  handlePlay = () => {
    sound.play();
    /*this.timer = setInterval(() => {
      const newCount = this.state.count + sound.seek();
      this.setState(
        {count: newCount >= 0 ? newCount : 0}
      );
    }, 1000);*/
  };

  //потеря this в рекурсирвной функции ?
  renderSeekPos () {
    this.setState({
      seek: sound.seek()
    })
    if (this.state.isPlaying) {
      this._raf = raf(this.renderSeekPos);
    }
  }


  render() {
    return (
      <div>
        <CurrentTrack
        play={this.handlePlay}
        currentTrack={this.props.player.currentTrack}
        currentTime={this.state.seek}
        />
      </div>
    );
  }
}
