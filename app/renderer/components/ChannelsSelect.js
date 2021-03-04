import React, { Component, useLayoutEffect, useState } from 'react';
import Channel from './Channel';
import { setCurrentChannel } from '../../store/actions/action';


function Channels(props) {

    const [channels, setChannels] = useState(props.channels) 

    
    
    return(
        <div class="input-field col s12">
            <select>
            <option value="" disabled selected>Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            </select>
            <label>Materialize Select</label>
        </div>
    )
        
}

/*
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
*/

export default Channels;

