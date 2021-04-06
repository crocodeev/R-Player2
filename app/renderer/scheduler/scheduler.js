import taskScheduleCreator from './helpers/taskScheduleCreator';
import timeComparator from './helpers/timeComparator';
import shuffler from './helpers/shuffler';
import dayjs from 'dayjs';
import customParseFormat from'dayjs/plugin/customParseFormat'
import sound from '../sound/soundEmmiter';

dayjs.extend(customParseFormat);


export default class Scheduler {

    constructor(sound){
        this.channelStartTime = '00:00:00',
        this.channelEndTime = '23:59:59',
        this.tasks = [],
        this.sound = sound
    }


    set channelRule(rules){
        this.channelStartTime = this._toLeadingZero(rules.startTime);
        this.channelEndTime = this._toLeadingZero(rules.endTime);
    }

    createTasks(schedule){

        console.log("START CREATE SCHEDULE");
        
        const currentDate = dayjs().format('YYYY-MM-HH')

        schedule.forEach(element => {
        
            //check company date
            const period = element.period
            if( !(currentDate >= period.start && currentDate <= period.end) ){
                return;
            }
    
            //check is continous
            this._createTask(element);

        });
        
    }

    _createTask(element){

        //check for difference between channels rules 
        let startTime = this._timeHandler(element.weekInfo.allDaysPeriod.startTime);
        console.log("startTime before comparator", startTime);
        let endTime = this._timeHandler(element.weekInfo.allDaysPeriod.endTime);
        console.log("endTime before comparator", endTime);

        
        //check for time difference with channels rules
        
        startTime = timeComparator(startTime, this.channelStartTime, "start");
        console.log("startTime after comparator", startTime);
        endTime = timeComparator(endTime, this.channelEndTime, "end");
        console.log("endTime after comparator", startTime);

        //create task 
        const playlist = shuffler(element.playlists[0].tracks)
        
        const action = () => {
                
                //при длительной кампании
                sound.setNewPlaylist(this.playlist);
                /*
                если прервать немедленно, то stop and play
                если дождаться окончания или теневая загрузка, то once end 
                */
                sound.play();
        }
        //здесь создаём job с учётом

        const task = taskScheduleCreator(startTime, endTime, element, action);

        //task.name = element.name;
        task.playbackMode =  element.playbackMode;
        task.startTime = startTime;

        
        this.tasks.push(task);

        this.checkForMissedLaunch();
    }


    checkForMissedLaunch(){
        const toLaunch = this.tasks.find( element => {
            return element.playbackMode === 1 && element.startTime < dayjs().format('HH:mm:ss') });

        console.log(toLaunch);    
        if(toLaunch){
            toLaunch.job();  
        }else{
            //if periodic campaign didn't exist stop
            return;
        }
        
    }


    _lastModifiedStateHandler(job){
        const name = job.name;
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
        this.tasks = []
    }


}
