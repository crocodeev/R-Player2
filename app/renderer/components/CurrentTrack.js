import React, { useEffect, useRef } from 'react';
import raf from 'raf';
import TrackName from './currentTrackComponents/TrackName' 

export default function CurrentTrack(props)  {

    const seekPosition = useRef(0);
    const duration = useRef(1);
    const currentTrack = useRef("");

    useEffect(() => {
      soundModule.on('play', () => {
        renderSeekPos();
        duration.current = soundModule.currentTrackDuration;
        currentTrack = soundModule.currentTrack;
      })
      soundModule.on('end', () => {
        renderSeekPos();
      })
    },[])

    const renderSeekPos = () => {
        seekPosition.current = soundModule.seek();
        console.log(seekPosition.current);
        raf(renderSeekPos);
    }

    //очистка requestAnimationFrame
    const clearRAF = () => {
      raf.cancel(raf)
    }
  
    function progress(){
      return seekPosition.current*100/duration.current;
    }


    return (
      <div>
        <TrackName name={currentTrack.current} seekPosition={seekPosition.current} duration={duration.current}/>
        <div className="progress">
          <div className="determinate" style={{width: progress() +'%'}}></div>
        </div>
      </div>
    );
}
