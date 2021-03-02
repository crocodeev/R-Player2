import React, { Component, useLayoutEffect, useState } from 'react';
import Channel from './Channel';
import { setCurrentChannel } from '../../store/actions/action';

/*
function Channels(props) {

    const [channels, setChannels] = useState() 
}
*/

class Channels extends Component {

    constructor(props){
      super();
      this.channels = props.channels;
      this.getSchedule = props.onClick;
    }


    shouldComponentUpdate(nextProps){
      return this.props.currentChannel !== nextProps.currentChannel;
    }


    render(){
      return (
        <ul className="collection" onClick={(e) => this.getSchedule(e)}>
        {this.channels.map((item) => <Channel
                                      name={item.name}
                                      key={item.id}
                                      value={item.id}
                                      className={item.id == this.props.currentChannel ? "collection-item active": "collection-item"} />)}
        </ul>
      );
    }
    }

export default Channels;
