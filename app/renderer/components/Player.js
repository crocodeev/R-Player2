import React, { Component, useEffect, useState } from 'react';
import CurrentTrack from './CurrentTrack';
import TrackList from './TrackList';
import ChannelsSelect from './ChannelsSelect';
import Download from './Download';
import NetworkStatus from './NetworkStatus';
import sound from '../sound/soundEmmiter';


const Player = (props) => {

  const handlePlay = () => {
    sound.play();
  };

  const handleLogOut = () => {
    sound.cancelAutomaticPlayNext();
    sound.stop();
    props.logout();
  }

  return (
    <div className="container">
    <div className="row">
     <div className="col s10 pdleftzero"> 
     <CurrentTrack />
     </div>
     <div className="col s2 pdrightzero"> 
     <NetworkStatus />
     </div> 
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


