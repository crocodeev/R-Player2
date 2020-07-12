import React, { Component } from 'react';
import CurrentTrack from './CurrentTrack';
import TrackList from './TrackList';
import raf from 'raf';

//sound works
import tracks from '../../hardcode/tracks';
import Sound from '../sound/soundEmmiter';
const sound = new Sound(tracks);



export default class Player extends Component {

  //нужно перенести state в store, а может и не нужно
  constructor(props) {
    super(props);
    this.state = {
      seek: 0,
      duration: 0,
      currentPosition: 0,
      isPlaying: true
    }
    this.renderSeekPos = this.renderSeekPos.bind(this);
  }

  componentDidMount(){
      sound.on('play', (trackName) => {
      this.setState({isPlaying: true});
      this.props.track(trackName);
      this.duration = sound.getDuration();
      this.increaseCurrentPosition();
      this.renderSeekPos();
    } );
    sound.on('end', () => {
      this.clearRAF();
    })
  }

  handlePlay = () => {
    sound.play();
  };

  increaseCurrentPosition (){
    this.setState((state)=>{
      return {currentPosition: state.currentPosition + 1}
    })
  }

  //потеря this в рекурсирвной функции ?
  renderSeekPos () {
    this.setState({
      seek: sound.seek()
    })
    if (this.state.isPlaying) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  //очистка requestAnimationFrame
  clearRAF () {
    raf.cancel(this._raf)
  }


  render() {

    return (
      <div>
        <CurrentTrack
        play={this.handlePlay}
        currentTrack={this.props.player.currentTrack}
        currentTime={this.state.seek}
        duration={this.duration || 0}
        />
      <TrackList
        playlist={sound.playlist}
        currentTrack={this.props.player.currentTrack}
        currentPosition={this.state.currentPosition} />
      </div>
    );
  }
}
