import scheduler from 'node-schedule'

export default function taskScheduleCreator(start, end, element, action){

    const job = scheduler

    //continuous or not
    const taskRules = {};
    if( element.playbackMode === 1 ){
        taskRules.rule = '*/1 * * * * *';
    }else{
        throw new Error("Handling reccurence schedule not implemented for now");
    }

    const pattern = createCrontabPattern(start);

    console.log(pattern);

    return scheduler.scheduleJob(
        element.name, 
        taskRules,
        action
        );

}

function createCrontabPattern(time){

    console.log(time);

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