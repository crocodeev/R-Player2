import taskScheduleCreator from './taskScheduleCreator';
import shuffler from './shuffler';
import dayjs from 'dayjs';

class Scheduler {

    constructor(){
        this.channelStartTime = '00:00:00',
        this.channelEndTime = '23:59:59',
        this.tasks = []
    }


    set channelRule(channel){
        this.channelStartTime = сhannel.workTime.startTime;
        this.channelEndTime = channel.workTime.endTime;
    }

    //return task and push to tasks array, or return current date
    createTasks(schedule){
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

        let startTime = this._timeHandler(element.weekInfo.allDaysPeriod.startTime);
        let endTime = this._timeHandler(element.weekInfo.allDaysPeriod.endTime);

        //check for difference between channels rules
        


       

    }


    //time in object to string
    _timeHandler(timeObject){
        return `${timeObject.hour}:${timeObject.minutes}`
    }


}
