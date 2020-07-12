import React from 'react';

function TrackListItem({name, style, clName}) {
  return (
    <li type="button" style={style} className={clName} >
    {name}
    </li>
  );
}

export default TrackListItem;

