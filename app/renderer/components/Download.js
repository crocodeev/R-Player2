import React from 'react';
import { connect } from 'react-redux';

const Download = React.memo((props) => {

  console.log("render");

<<<<<<< HEAD
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
=======
  return (
    <div>
    <label className="label-download-progress">DOWNLOAD PROGRESS</label>
     <div className="progress download">
      <div className="determinate" style={
        {width: (props.downloadCount * 100/props.playlist.length ) +'%'}
      }></div>
    </div>
    </div>
  );
  
}, 
(prevProps, nextProps) => {
  return prevProps.downloadCount === nextProps.downloadCount ? true : false
}
)
>>>>>>> e59f8357fd358d1a8a6b45e4d551bd2403312685

const mapStateToProps = (state) => {
  return state.player
}


export default connect(mapStateToProps)(Download);
