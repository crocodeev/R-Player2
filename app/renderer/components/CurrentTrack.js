import React, { useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import TrackName from './currentTrackComponents/TrackName' ;
import SeekNumber from './currentTrackComponents/SeekNumber';
import SeekBar from './currentTrackComponents/SeekBar'

function CurrentTrack({
  name,
  duration,
  seek
}) {

  //decrease render count
  //console.log("render");

  const trackName = useMemo(() => <TrackName name={name}/>, [name])

    return (
      <div>
        {trackName}
        <SeekNumber seek={seek} duration={duration}/>
        <SeekBar seek={seek} duration={duration}/>
      </div>
    );
}

const mapStateToProps = (state) => {
  return state.player.currentTrack;
};

export default connect(mapStateToProps)(CurrentTrack)