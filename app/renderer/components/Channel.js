import React from 'react';

function Channel(props) {

  return (
    <a className={props.className} id={props.id} value={props.value}>
      {props.name}
    </a>
  );
}

export default Channel;
