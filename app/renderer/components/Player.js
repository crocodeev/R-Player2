import React, { Component } from 'react';
import CurrentTrack from './CurrentTrack';
import TrackList from './TrackList';
import Channels from './Channels';
import Download from './Download';
import raf from 'raf';

import sound from '../sound/soundEmmiter';

//inter proccess communication

import rpc from '../../api/renderProccessConnector';

//временное

import taskScheduleCreator from '../scheduler/taskScheduleCreator'
import shuffler from '../scheduler/shuffler'
const dayjs = require('dayjs')




export default class Player extends Component {

  //нужно перенести state в store, а может и не нужно
  constructor(props) {

    super(props);
    this.state = {
      //seek: 0,
      //duration: 0,
      currentPosition: 0,
      isPlaying: false
    }
    this.currentChannel = this.props.player.currentChannel != null ? this.props.player.currentChannel : null;
    //this.renderSeekPos = this.renderSeekPos.bind(this);
    this.getSchedule  = this.getSchedule.bind(this);

    /*
    Handle schedule
    In near future need to transfer in separate module
    No logic in Player
    */

    const initialPlaylist = typeof this.props.player.schedule == "undefined" ? [{name:"placeholder"}] : this.props.player.schedule[0].playlists[0].tracks;
    sound.setNewPlaylist(initialPlaylist)


    //check is schedule exist
    //по факту не загрузится, если проверку в загрузке не сделать
    if( "schedule" in this.props.player){

      const now = dayjs().format('H:m')
      const scheduleTime = this.props.player.schedule[0].weekInfo.allDaysPeriod.startTime
      const scheduleStartTime = `${scheduleTime.hour}:${scheduleTime.minutes}`

      console.log("now :" + now);
      console.log("ScheduleStartTime: " + scheduleStartTime);

      // if start time overdue, start immediatly
      if(now > scheduleStartTime){
        sound.play()
      }else{
        //check channel rules
        const channelSchedule = this.props.player.channels.find( c => c.id == this.props.player.currentChannel)
   
        const channelRule = {
          start: channelSchedule.workTime.startTime,
          end: channelSchedule.workTime.endTime
        }
      
        taskScheduleCreator(channelRule, this.props.player.schedule[0].weekInfo.allDaysPeriod.startTime, () => {
          sound.play()
        });
        
      }
    }


  }

  componentDidMount(){
      sound.on('play', () => {
      if(!this.state.isPlaying){
        this.setState({isPlaying: true});
      }  
      //this.props.track(trackName);
      //this.duration = sound.getDuration();
      this.increaseCurrentPosition();
      //this.renderSeekPos();
    } );
    /*sound.on('end', () => {
      //this.clearRAF();
    })*/
  }

  componentWillReceiveProps(nextProps){

    if (nextProps.player.downloadCompleted && !this.state.isPlaying){
      this.setState({isPlaying: true});

      const playlist = this.props.player.schedule[0].playlists[0].tracks;

      const shuffledPlaylist = shuffler(playlist)
      sound.setNewPlaylist(shuffledPlaylist);
      
      const now = dayjs().format('H:m')
      const scheduleTime = this.props.player.schedule[0].weekInfo.allDaysPeriod.startTime
      const scheduleStartTime = `${scheduleTime.hour}:${scheduleTime.minutes}`

      console.log("now :" + now);
      console.log("ScheduleStartTime: " + scheduleStartTime);

      // if start time overdue, start immediatly
      if(now > scheduleStartTime){
        sound.play()
      }else{
        //check channel rules
        const channelSchedule = this.props.player.channels.find( c => c.id == this.props.player.currentChannel)
   
        const channelRule = {
          start: channelSchedule.workTime.startTime,
          end: channelSchedule.workTime.endTime
        }
      
        taskScheduleCreator(channelRule, this.props.player.schedule[0].weekInfo.allDaysPeriod.startTime, () => {
          sound.play()
        });
        
      }

    }
  }


  handlePlay = () => {
    sound.play();
  };

  handleLogOut = () => {
    this.props.logout();
    this.props.downloadStatus(false);
  }

  getSchedule(event){
    const channelId = event.target.getAttribute("value");
    this.props.channel(channelId);
    rpc.getSchedule(channelId);
  }

  increaseCurrentPosition (){
    this.setState((state)=>{
      return {currentPosition: state.currentPosition + 1}
    })
  }

  /*renderSeekPos () {
    this.setState({
      seek: sound.seek()
    })
    if (this.state.isPlaying) {
      this._raf = raf(this.renderSeekPos);
    }
  }*/

  //очистка requestAnimationFrame
  /*clearRAF () {
    raf.cancel(this._raf)
  }*/


  render() {

    return (
      <div className="container">

      <div className ="row">
       <CurrentTrack />
      </div>

      <div className="row">

      <div className="col s3">
        <Channels
          channels={this.props.player.channels}
          currentChannel={this.props.player.currentChannel}
          onClick={this.getSchedule} />
      </div>

      <div className="col s9 scrolist">
      {
        this.props.player.downloadCompleted ?
        (
          <TrackList
              playlist={sound.playlist}
              currentTrack={this.props.player.currentTrack}
              currentPosition={this.state.currentPosition}/>
        ):(
          <h2>PLACEHOLDER</h2>
        )
      }
      </div>

      </div>


      <Download
        totalTracks={ typeof this.props.player.schedule == "undefined" ? 0 : this.props.player.schedule[0].playlists[0].tracks.length}
        downloadCount={this.props.player.downloadCount}
      />


      <div className="row buttonrow">
        <div className="col">
          <a className="waves-effect waves-light btn-small supersmall" onClick={this.handlePlay}>
          PLAY
          </a>
        </div>
        <div className="col">
          <a className="waves-effect waves-light btn-small supersmall" onClick={this.handleLogOut}>
          LOGOUT
          </a>
        </div>
      </div>

      </div>
    );
  }
}

