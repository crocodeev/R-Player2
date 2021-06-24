import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { setCurrentChannel } from '../../store/actions/apiActions';
import { setChannelRules } from '../../store/actions/scheduleActions';
import rpc from '../../api/renderProccessConnector';

function ChannelsSelect({
  channels,
  currentChannel,
  setChannelToStore,
  setChannelRuleToScheduleStore
}) {
  
    useEffect(() => {
      M.AutoInit()
    }, [])

    function selectChannel(event){
      const value = event.target.value;
      setChannelToStore(value);
      const channelInfo = channels.find(item  => item.id == value);
      const channelRule = channelInfo.workTime;
      channelRule.reboot = channelInfo.reboot;
      setChannelRuleToScheduleStore(channelRule);
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
    setChannelRuleToScheduleStore: (channelRules) => dispatch(setChannelRules(channelRules))  
  };
};

const mapStateToProps = (state) => {
  let {channels, currentChannel} = state.webapi;
  return {
    channels,
    currentChannel
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChannelsSelect);

