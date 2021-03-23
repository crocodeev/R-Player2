import scheduler from 'node-schedule'
import timeComparator from './timeComparator'

export default function taskScheduleCreator(time, job){


    const pattern = createCrontabPattern(time);

    return scheduler.scheduleJob(pattern, job);

}

function createCrontabPattern(time){

    const readyTime = new TimeParse(time);
    const pattern = `${readyTime.getSeconds()} ${readyTime.getMinutes()} ${readyTime.getHours()} * * *`;
    return pattern;
}

class TimeParse {

    constructor(time){
        this.time = time
    }

    getSeconds(){

        
        const ss = this.time.slice(6,8)
        return  ss == 0 ? 0 : ss
    }

    getMinutes(){

        const mm = this.time.slice(3,5)
        return mm == 0 ? 0 : mm
    }

    getHours(){

        const hh = this.time.slice(0,2)
        return hh == 0 ? 0 : hh
    }
}