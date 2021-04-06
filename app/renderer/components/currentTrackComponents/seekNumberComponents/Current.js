import React from 'react';
import secondsToTime from '../../../helpers/secondsToTime';


const Current = (props) => {

   
    return (
        <h6 className="timer">{secondsToTime(props.seek)}</h6>
    );

}


export default Current