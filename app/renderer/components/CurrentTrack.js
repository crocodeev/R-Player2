import React, { useEffect, useRef } from 'react';
import raf from 'raf';

export default function CurrentTrack(props)  {

    const seekPosition = useRef(0);
    const duration = useRef(1);

    useEffect(() => {
      soundModule.on('play', () => {
        renderSeekPos();
        duration.current = soundModule.currentTrackDuration;
      })
      soundModule.on('end', () => {
        renderSeekPos();
      })
    },[])

    const renderSeekPos = () => {
        seekPosition.current = soundModule.seek();
        raf(renderSeekPos);
    }

    //очистка requestAnimationFrame
    const clearRAF = () => {
      raf.cancel(raf)
    }
  
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
