import React from 'react';
import SeekNumber from './SeekNumber';

function SeekBar({seek, duration}){

    function progress() {
        return seek*100/duration
    }

    return(

      <div className="progress">
        <div className="determinate" style={{width: progress() +'%'}}></div>
      </div>
  );

}

export default SeekBar