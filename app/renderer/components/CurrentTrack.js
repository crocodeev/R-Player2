import React, { useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import TrackName from './currentTrackComponents/TrackName' ;
import SeekNumber from './currentTrackComponents/SeekNumber';
import SeekBar from './currentTrackComponents/SeekBar'


const CurrentTrack = React.memo(
  //component
  ({
    name,
  }) => {
    
    return (
      <div>
        <TrackName name={name} />
        <SeekNumber />
        <SeekBar />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name ? true : false
  }
)


const mapStateToProps = (state) => {
  return state.player.currentTrack;
};

export default connect(mapStateToProps)(CurrentTrack)