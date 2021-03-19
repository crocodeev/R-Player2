import React, { Component, useEffect, useState } from 'react';
import CurrentTrack from './CurrentTrack';
import TrackList from './TrackList';
import ChannelsSelect from './ChannelsSelect';
import Download from './Download';
import sound from '../sound/soundEmmiter';
//inter proccess communication
import rpc from '../../api/renderProccessConnector';
//временное
import taskScheduleCreator from '../scheduler/taskScheduleCreator'
import shuffler from '../scheduler/shuffler'
const dayjs = require('dayjs')

const Player = (props) => {

  //текущее состояние модуля Sound, нужно получить из самого Sound
  const [isPlaying, setIsPlaying] = useState(false);

  //при первом запуске компанента
  useEffect(()=>{

    sound.on('play', () => {
      if(!isPlaying){
        setIsPlaying(true);
      }  
    });

    //check is schedule exist
    //по факту не загрузится, если проверку в загрузке не сделать
    if( "schedule" in props.player){

      const now = dayjs().format('H:m')
      const scheduleTime = this.props.schedule[0].weekInfo.allDaysPeriod.startTime
      const scheduleStartTime = `${scheduleTime.hour}:${scheduleTime.minutes}`

      console.log("now :" + now);
      console.log("ScheduleStartTime: " + scheduleStartTime);

      // if start time overdue, start immediatly
      if(now > scheduleStartTime){
        sound.play()
      }else{
        //check channel rules
        const channelSchedule = props.webapi.channels.find( c => c.id == props.webapi.currentChannel)
   
        const channelRule = {
          start: channelSchedule.workTime.startTime,
          end: channelSchedule.workTime.endTime
        }
      
        taskScheduleCreator(channelRule, this.props.schedule.schedule[0].weekInfo.allDaysPeriod.startTime, () => {
          sound.play()
        });
        
      }
    }
  }, [])

  //при загрузке
  useEffect(()=>{
    if (props.player.downloadCompleted && !isPlaying){
      setIsPlaying(true);

      const playlist = props.schedule.schedule[0].playlists[0].tracks;

      const shuffledPlaylist = shuffler(playlist)
      sound.setNewPlaylist(shuffledPlaylist);
      
      const now = dayjs().format('H:m')
      const scheduleTime = props.schedule.schedule[0].weekInfo.allDaysPeriod.startTime
      const scheduleStartTime = `${scheduleTime.hour}:${scheduleTime.minutes}`

      console.log("now :" + now);
      console.log("ScheduleStartTime: " + scheduleStartTime);

      // if start time overdue, start immediatly
      if(now > scheduleStartTime){
        sound.play()
      }else{
        //check channel rules
        const channelSchedule = props.player.channels.find( c => c.id == props.webapi.currentChannel)
   
        const channelRule = {
          start: channelSchedule.workTime.startTime,
          end: channelSchedule.workTime.endTime
        }
      
        taskScheduleCreator(channelRule, props.webapi.schedule[0].weekInfo.allDaysPeriod.startTime, () => {
          sound.play()
        });
        
      }
    }
  },
  [props.player])

  const handlePlay = () => {
    sound.play();
  };

  const handleLogOut = () => {
    this.props.logout();
    this.props.downloadStatus(false);
  }

  return (
    <div className="container">
    <div className ="row">
     <CurrentTrack />
    </div>
    <div className = "row">
      <div className="col s4 pdleftzero">
      <ChannelsSelect />
      </div>
      <div className="col s8 pdrightzero">
      <Download />
      </div>
    </div>
    <div className="row">
    <div className="scrolist">
        <TrackList />
    </div>

    </div>
    
    <div className="row buttonrow">
      <div className="col">
        <a className="waves-effect waves-light btn-small supersmall" onClick={handlePlay}>
        PLAY
        </a>
      </div>
      <div className="col">
        <a className="waves-effect waves-light btn-small supersmall" onClick={handleLogOut}>
        LOGOUT
        </a>
      </div>
    </div>

    </div>
  );
}

export default Player


