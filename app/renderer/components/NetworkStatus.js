import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';


function NetworkStatus({
    networkStatus
}) {
  
    return(
     <div className="center-align"> 
     <h6>Online status:</h6>
     <span className={ networkStatus ? 
        "material-icons green-text green-darken-1 network-status-point" 
        :
        "material-icons red-text red-darken-1 network-status-point" }>lens</span>
     </div>  
    )        
}


const mapStateToProps = (state) => {
  const { networkStatus } = state.webapi;
  return { networkStatus };
};


export default connect(mapStateToProps)(NetworkStatus);
