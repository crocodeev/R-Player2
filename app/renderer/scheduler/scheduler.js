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

    //return task and push to tasks array, or return current date
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
            if(element.playbackMode == 1){
                this.continuousPlaybackHandler(element);

            }else{
                //for now
                return;
            }
    
        });
        
    }

    continuousPlaybackHandler(element){

        //check for difference between channels rules 
        let startTime = this._timeHandler(element.weekInfo.allDaysPeriod.startTime);
        let endTime = this._timeHandler(element.weekInfo.allDaysPeriod.endTime);
        const now = dayjs().format('H:m')


        //check for time difference with channels rules
        
        startTime = timeComparator(startTime, this.channelStartTime);

        //create task
        const playlist = shuffler(element.playlists[0].tracks)

        const task = taskScheduleCreator(startTime, () => {
            //при длительной кампании
            sound.setNewPlaylist(playlist);
            //sound.play();
        });
        //if continuous task is overdue

        if(now > startTime){
            task.job()
        }

        this.tasks.push(task);
    }


    //time in object to string
    _timeHandler(timeObject){
        return `${timeObject.hour}:${timeObject.minutes}`
    }

    clearTaskQueue(){
        this.tasks = []
    }


}
