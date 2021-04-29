import scheduler from 'node-schedule'

export default function taskScheduleCreator(startTime, endTime, element, action){

    console.log("Create task");
    console.log(element.name);
    console.log(startTime);
    //continuous or not
    if( element.playbackMode === 1 ){
        const pattern = createCrontabPattern(startTime);
        return scheduler.scheduleJob(element.name, pattern, action);
        
    }else{

        console.log('PERIODIC');
        const pattern = createCrontabPattern(startTime, element.blockInfo);
        console.log(pattern);
        return scheduler.scheduleJob(element.name, pattern, action);

    }

}

function createCrontabPattern(time, blockInfo){

    const parsedTime = time.split(":").reverse().join(" ");
    let pattern = `${time} * * *`;

    if(!blockInfo){
        return pattern;
    }

    // every hour
    if(blockInfo.timeType){
        pattern = str.slice(0,8) + `/${blockInfo.time}` + str.slice(8, str.length);
        return pattern
    }

    //every n-minute
    pattern  = str.slice(0,5) + `/${blockInfo.time}` + str.slice(5, str.length);

    return pattern;


}



/*
class TimeParse {


    static get seconds(time){
   
        return time.slice(6,8);
    
    }

    static get minutes(){

        return time.slice(3,5);
    }

    static get hours(){

        return time.slice(0,2);
    }
}
*/