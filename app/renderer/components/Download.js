import React from 'react';

export default function Download(props)  {

  //реализовать should companent update для функционального компонента

    return (
      <div className="input-field row teal lighten-5 valign-wrapper downloadrow">
      <label>DOWNLOAD PROGRESS</label>  
      <div className="col s12">
       <div className="progress download">
        <div className="determinate" style={
          {width: (props.downloadCount * 100/props.totalTracks ) +'%'}
        }></div>
      </div>
      </div>
      </div>
    );

}
