import React  from 'react';
import TrackName from './currentTrackComponents/TrackName' ;
import SeekNumber from './currentTrackComponents/SeekNumber';
import SeekBar from './currentTrackComponents/SeekBar';

const CurrentTrack = ({ name }) => {

    return (
      <div>
        <TrackName />
        <SeekNumber />
        <SeekBar />
      </div>
    );
  }

export default CurrentTrack;