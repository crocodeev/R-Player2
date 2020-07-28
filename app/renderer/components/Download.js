import React, { Component } from 'react';

export default function Download(props)  {

    return (
      <div className="row teal lighten-5 valign-wrapper downloadrow">
       <div className="col s3 center-align">
       <span className="flow-text teal-text text-darken-1">
        <h6>download progress:</h6>
       </span>
       </div>
      <div className="col s9">
       <div className="progress download">
        <div className="determinate" style={{width: 50 +'%'}}></div>
      </div>
      </div>
      </div>
    );

}
