import React, { Component } from 'react';

export default function CurrentTrack(props)  {

    return (
      <div>
        <h6>{props.currentTrack}</h6><h6>{props.currentTime}</h6>
        <div className="progress">
          <div className="determinate" style={{width: 70+'%'}}></div>
        </div>
        <a className="waves-effect waves-light btn-small" onClick={props.play}>
          PLAY
        </a>
      </div>
    );
}
