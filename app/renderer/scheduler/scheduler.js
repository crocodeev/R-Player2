import taskScheduleCreator from './helpers/taskScheduleCreator';
import timeComparator from './helpers/timeComparator';
import shuffler from './helpers/shuffler';
import dayjs from 'dayjs';
import sound from '../sound/soundEmmiter';

export default class Scheduler {

    constructor(sound){
        this.channelStartTime = '00:00:00',
        this.channelEndTime = '23:59:59',
        this.tasks = [],
        this.sound = sound
    }


    set channelRule(rules){
        this.channelStartTime = rules.startTime;
        this.channelEndTime = rules.endTime;
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
        let endTime = this._timeHandler(element.weekInfo.allDaysPeriod.endTime);

        
        //check for time difference with channels rules
        
        startTime = timeComparator(startTime, this.channelStartTime, "start");
        endTime = timeComparator(endTime, this.channelEndTime, "end");

        //create task 
        const playlist = shuffler(element.playlists[0].tracks)

        const action = () => {
                console.log("action sound");
                //при длительной кампании
                //sound.setNewPlaylist(playlist);
                /*
                если прервать немедленно, то stop and play
                если дождаться окончания или теневая загрузка, то once end 
                */
                //sound.play();
        }
        //здесь создаём job с учётом
        const task = taskScheduleCreator(startTime,
                                         endTime,
                                         element,
                                         action);

        //task.name = element.name;
        task.playbackMode =  element.playbackMode;
        task.startTime = startTime;

        
        this.tasks.push(task);

        //this.checkForMissedLaunch();
    }

    checkForMissedLaunch(){
        const toLaunch = this.tasks.find( element => {
            return element.playbackMode === 1 && element.startTime < dayjs().format('HH:mm:ss') });
        
        toLaunch.job();  
    }

    

    //time in object to string
    _timeHandler(timeObject){
        return `${timeObject.hour}:${timeObject.minutes}`
    }

    clearTaskQueue(){
        this.tasks = []
    }


}
