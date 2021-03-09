import React from 'react';


const SeekNumber = React.memo((props) => {

    return (
        <h6>{props.seek + "/" + props.duration}</h6>
    );
})


export default SeekNumber
