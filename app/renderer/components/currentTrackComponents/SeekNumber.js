import React from 'react';
import { connect } from 'react-redux';
import Duration from './seekNumberComponents/Duration';
import Current from './seekNumberComponents/Current';

const SeekNumber = (props) => {


    return (
        <div>
            <Current seek={ props.seek } />
            <h6 className="timer">/</h6>
            <Duration duration={ props.duration } />
        </div>
    );

}

const mapStateToProps = (state) => {
    return  state.player.currentTrack;
}


export default connect(mapStateToProps)(SeekNumber);
