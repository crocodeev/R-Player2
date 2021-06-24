import React from 'react';
import { connect } from 'react-redux';
import SeekNumber from './SeekNumber';

const SeekBar = ({seek, duration}) => {

    function progress() {
        return seek*100/duration
    }

    return(

      <div className="progress blue-grey lighten-3">
        <div className="determinate white" style={{width: progress() +'%'}}></div>
      </div>
  );

}

const mapStateToProps = (state) => {
  return state.player.currentTrack;
};

export default connect(mapStateToProps)(SeekBar)
