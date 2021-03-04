import React, { useEffect, useRef } from 'react';
import raf from 'raf';

export default function CurrentTrack(props)  {

    console.log(props);

    return (
        <div>
        <h6>{props.name}</h6><h6>{props.seekPosition + "/" + props.duration}</h6>
        </div>
    );
}
