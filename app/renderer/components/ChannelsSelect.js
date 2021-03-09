import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { setCurrentChannel } from '../../store/actions/action';
import rpc from '../../api/renderProccessConnector';

function ChannelsSelect({
  channels,
  currentChannel,
  setChannelToStore
}) {

  
    useEffect(() => {
      M.AutoInit()
    }, [])

    function selectChannel(event){
      const value = event.target.value;
      setChannelToStore(value);
      rpc.getSchedule(value);
    }
  

    return( 
      <div className="input-field">
            <select 
              value={ currentChannel === undefined ? "default" : currentChannel }
              onChange={selectChannel}
            >
            <option value="default" disabled>Select Channel</option>
            {
            channels.map(elem => <option key={elem.id} value={elem.id}>{elem.name}</option>)
            }  
            </select>
            <label>CHANNEL SELECTOR</label>
      </div>      
    )
        
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChannelToStore: (channelId) => dispatch(setCurrentChannel(channelId)), 
  };
};

const mapStateToProps = (state) => {
  return state.webapi;
};


export default connect(mapStateToProps, mapDispatchToProps)(ChannelsSelect);

