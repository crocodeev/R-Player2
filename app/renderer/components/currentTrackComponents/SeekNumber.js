import React from 'react';
import { connect } from 'react-redux';

const SeekNumber = (props) => {

    return (
        <h6>{props.seek + "/" + props.duration}</h6>
    );

}

const mapStateToProps = (state) => {
    return  state.player.currentTrack;
}


export default connect(mapStateToProps)(SeekNumber);
