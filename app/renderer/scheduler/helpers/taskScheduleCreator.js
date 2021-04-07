import scheduler from 'node-schedule'

export default function taskScheduleCreator(startTime, endTime, element, action){

    //continuous or not
    if( element.playbackMode === 1 ){
        /*const pattern = createCrontabPattern(startTime);
        console.log("pattern", pattern);*/
        return scheduler.scheduleJob(element.name, '0 0 09 * * *', action);
        
    }else{
        throw new Error("Handling reccurence schedule not implemented for now");
    }

}

function createCrontabPattern(time){

    const readyTime = new TimeParse(time);

    const pattern = `${readyTime.getSeconds()} ${readyTime.getMinutes()} ${readyTime.getHours()} * * *`;
    return pattern;
}


class TimeParse {


    constructor(time){
        this.time = time;
        console.log("time to parse", time);

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