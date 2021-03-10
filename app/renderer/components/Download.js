import React from 'react';

export default function Download(props)  {

  //реализовать should companent update для функционального компонента

    return (
      <div>
      <label className="label-download-progress">DOWNLOAD PROGRESS</label>
       <div className="progress download">
        <div className="determinate" style={
          {width: (props.downloadCount * 100/props.totalTracks ) +'%'}
        }></div>
      </div>
      </div>
    );

}
