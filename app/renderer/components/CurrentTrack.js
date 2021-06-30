import React, { useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import TrackName from './currentTrackComponents/TrackName' ;
import SeekNumber from './currentTrackComponents/SeekNumber';
import SeekBar from './currentTrackComponents/SeekBar'
import TestCompanent from './currentTrackComponents/TestCompanent';

const CurrentTrack = React.memo(
  //component
  ({
    name,
  }) => {


    console.log("render current track");
    
    return (
      <div>
        <TrackName name={name} />
        <SeekNumber />
        <TestCompanent />
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