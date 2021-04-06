import React from 'react';
import { connect } from 'react-redux';
import secondsToTime from '../../../helpers/secondsToTime';

const Duration = (props) => {

    return (
        <h6 className="timer">{secondsToTime(props.duration)}</h6>
    );

}


export default Duration