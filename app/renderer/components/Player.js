import React, { Component, useEffect, useState } from 'react';
import CurrentTrack from './CurrentTrack';
import TrackList from './TrackList';
import ChannelsSelect from './ChannelsSelect';
import Download from './Download';
import sound from '../sound/soundEmmiter';
const dayjs = require('dayjs')

const Player = (props) => {

  //текущее состояние модуля Sound, нужно получить из самого Sound
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    sound.play();
  };

  const handleLogOut = () => {
    this.props.logout();
    this.props.downloadStatus(false);
  }

  return (
    <div className="container">
    <div className ="row">
     <CurrentTrack />
    </div>
    <div className = "row">
      <div className="col s4 pdleftzero">
      <ChannelsSelect />
      </div>
      <div className="col s8 pdrightzero">
      <Download />
      </div>
    </div>
    <div className="row">
    <div className="scrolist">
        <TrackList />
    </div>

    </div>
    
    <div className="row buttonrow">
      <div className="col">
        <a className="waves-effect waves-light btn-small supersmall" onClick={handleLogOut}>
        LOGOUT
        </a>
      </div>
    </div>

    </div>
  );
}

export default Player


