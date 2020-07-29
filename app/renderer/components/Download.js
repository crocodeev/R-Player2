import React from 'react';

export default function Download(props)  {

  console.log(props.downloadCount * 100 / props.totalTracks );

    return (
      <div className="row teal lighten-5 valign-wrapper downloadrow">
       <div className="col s3 center-align">
       <span className="flow-text teal-text text-darken-1">
        <h6>download progress:</h6>
       </span>
       </div>
      <div className="col s9">
       <div className="progress download">
        <div className="determinate" style={
          {width: (props.downloadCount * 100/props.totalTracks ) +'%'}
        }></div>
      </div>
      </div>
      </div>
    );

}
