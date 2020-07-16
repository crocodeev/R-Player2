import React, { Component } from 'react';

export default function CurrentTrack(props)  {

    function progress(){
      return props.currentTime*100/props.duration;
    }

    return (
      <div>
        <h6>{props.currentTrack}</h6><h6>{props.currentTime + "/" + props.duration}</h6>
        <div className="progress">
          <div className="determinate" style={{width: progress() +'%'}}></div>
        </div>
      </div>
    );
}
