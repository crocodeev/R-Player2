import taskScheduleCreator from './helpers/taskScheduleCreator';
import timeComparator from './helpers/timeComparator';
import shuffler from './helpers/shuffler';
import dayjs from 'dayjs';
import customParseFormat from'dayjs/plugin/customParseFormat'
import PlaybackController from '../sound/soundPlaybackController';
import sound from '../sound/soundEmmiter';
import rpc from '../../api/renderProccessConnector';

const playbackController = new PlaybackController(sound);


dayjs.extend(customParseFormat);


export default class Scheduler {

    constructor(){
        if(!!Scheduler.instance){
            return Scheduler.instance;
        }

        Scheduler.instance = this;

        this.channelStartTime = '00:00:00',
        this.channelEndTime = '23:59:59',
        this.tasks = [],
        this.typeOfLaunch = Object.freeze({
            atStart: "atStart",
            atUpdate: "atUpdate"
        })
    }


    set channelRule(rules){
        this.channelStartTime = this._toLeadingZero(rules.startTime);
        this.channelEndTime = this._toLeadingZero(rules.endTime);
        this.channelRebootTime = this._toLeadingZero(rules.reboot);
    }

    createTasks(schedule){

        console.time("CREATE SCHEDULE");
        
        const currentDate = dayjs().format('YYYY-MM-DD')

        schedule.forEach(element => {
        
            //check for overdue
            const period = element.period
            if( !(currentDate >= period.start && currentDate <= period.end) ){
                return;
            }
    
            //check is continous
            this._createTask(element);

        });

        console.timeEnd("CREATE SCHEDULE");

        this._setStop();

        this._setRelaunch();

        this._checkForMissedLaunch();
        
    }

    _createTask(element){

        //check for difference between channels rules 
        let startTime = this._timeHandler(element.weekInfo.allDaysPeriod.startTime);
        let endTime = this._timeHandler(element.weekInfo.allDaysPeriod.endTime);
    
        //check for time difference with channels rules
        startTime = timeComparator(startTime, this.channelStartTime, "start");
        endTime = timeComparator(endTime, this.channelEndTime, "end");

        console.log("ELEMENT :", element.name);
        
        const action = this._createAction(element);

        //может пригодиться для упрощения логики запуска плейлиста, если он пропущен

        //здесь создаём job с учётом 

        const task = taskScheduleCreator(startTime, endTime, element, action);
        console.log(task);

        if(task){
            //task.name = element.name;
            task.playbackMode = element.playbackMode;
            task.startTime = startTime;
            task.endTime = endTime;

            this.tasks.push(task);
        }

        
    }

    // в эту функцию 
    _checkForMissedLaunch(){

        const currentTime = dayjs().format('HH:mm:ss');
        // continuous campaign exist and overdue
        const toLaunch = this.tasks.find( element => {

            if(element.playbackMode !== 1){
                return false;
            }

            //midnight checkers, if campaign resume after midnight
            if(element.startTime > element.endTime && element.endTime > currentTime){
                return true
            }

            if(element.startTime <= currentTime && element.endTime < element.startTime ){
                return true;
            }

            //standar campaign
            if(element.startTime <= currentTime && element.endTime >= currentTime){
                return true;
            }
            
        });

        console.log(currentTime);
        console.log(toLaunch.startTime);
        console.log(toLaunch.endTime);
        console.log(toLaunch.name);
     
        console.log(toLaunch);

        if(toLaunch){
            toLaunch.job();
        }    

    }

    _createAction(element){

        const playlist = shuffler(element.playlists[0].tracks);
        // check for periodic playbackmode
        if(element.playbackMode){

            return () => {
                playbackController.replacePlaylist(playlist);
            }
        }

        let counter = 0;

        return () => {
            console.log("Insert action");
            console.log(`Counter: ${counter}, Name: ${playlist[counter].name}, Path: ${playlist[counter].checksum}`);
            console.log(`Counter: ${counter}, Name: ${playlist[counter].name}, Path: ${playlist[counter].checksum}`);
            playbackController.insertIntoPlaylist(playlist[counter]);
            counter < playlist.length - 1  ? counter++ : counter = 0;  
        };

    }



    //time in object to string
    _timeHandler(timeObject){
        const time = `${timeObject.hour}:${timeObject.minutes}`;
        return this._toLeadingZero(time);
    }

    _toLeadingZero(time) {
        return dayjs(time, 'hh:mm').format('HH:mm:ss')
    }


    clearTaskQueue(){
        console.log("clear schedule queue");
        this.tasks.forEach(item => item.cancel());
        this.tasks = [];
    }
    
    _setStop() {

        console.log("Setting stop event");
        
        /**
         * first - compare campaign stop time and keep on bigger one
         * second - compare with channel rule and create task with smaller one
         */
        let campaignEndTime = "00:00:00"

        this.tasks.forEach((element) => {

            console.log(element);
            if(element.playbackMode == 1 && element.endTime > campaignEndTime){
                campaignEndTime = element.endTime;
            }

        });

        console.log(campaignEndTime);

        const action = () => {
            playbackController.stopAndClear();
        }

        if(campaignEndTime < this.channelEndTime){
            console.log("CAMPAIGN TIME: ", campaignEndTime);
            const task = taskScheduleCreator(campaignEndTime, "STOP",  action);
            this.tasks.push(task);
        }else{
            console.log("CHANNEL TIME: ", this.channelEndTime);
            const task = taskScheduleCreator(this.channelEndTime, "STOP", action);
            this.tasks.push(task);
        }

    }

    _setRelaunch(){

        console.log("Setting relaunch event");

        const action = rpc.relaunch;

        const task = taskScheduleCreator(this.channelRebootTime, "REBOOT", action);

        this.tasks.push(task);
    }


}
