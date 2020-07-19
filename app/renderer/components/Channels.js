import React from 'react';
import Channel from './Channel';

function Channels(props) {

  console.log(props);
    return (
      <ul className="collection" >
      {props.channels.map((item) => <Channel name={item.name} key={item.id} value={item.id} />)}
      </ul>
    );
    }

export default Channels;
