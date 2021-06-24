import React from 'react';
import { connect } from 'react-redux';

const Download = React.memo((props) => {

  return (
    <div>
    <label className="label-download-progress">DOWNLOAD PROGRESS</label>
     <div className="progress download blue-grey lighten-3">
      <div className="determinate green darken-1" style={
        {width: (props.downloadCount * 100/props.downloadAmount ) +'%'}
      }></div>
    </div>
    </div>
  );
  
}, 
(prevProps, nextProps) => {
  return prevProps.downloadCount === nextProps.downloadCount ? true : false
}
)

const mapStateToProps = (state) => {
  return state.player
}


export default connect(mapStateToProps)(Download);
