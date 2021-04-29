import scheduler from 'node-schedule'

export default function taskScheduleCreator(startTime, endTime, element, action){

    //continuous or not
    if( element.playbackMode === 1 ){
   
        const pattern = createCrontabPattern(startTime);
        console.log(pattern);
        console.log(scheduler.scheduleJob(element.name, pattern, action));
        return scheduler.scheduleJob(element.name, pattern, action);
        
    }else{

     
        const pattern = createCrontabPattern(startTime, endTime, element.blockInfo);
        console.log(pattern);
        return scheduler.scheduleJob(element.name, pattern, action);

    }

}

function createCrontabPattern(){

    let startTime;
    let endTime;
    let blockInfo; 

    if(arguments.length < 2 ){
        startTime = arguments[0];
    }else{
        startTime = arguments[0];
        //take only hours for now, not good solution but ok for now
        endTime = "-" + arguments[1].slice(0,2);
        blockInfo = arguments[2];
    }


    

    console.log("createCrontabPattern");
    console.log(startTime);
    console.log(endTime);
    console.log(blockInfo);

    const parsedTime = startTime.split(":").reverse().join(" ");
    let pattern = endTime ? `${parsedTime}${endTime} * * *` : `${parsedTime} * * *`;

    if(!blockInfo){
        return pattern;
    }

    // every hour
    if(blockInfo.timeType){
        pattern = pattern.slice(0,8) + `/${blockInfo.time}${endTime}` + pattern.slice(8, pattern.length);
        return pattern
    }

    //every n-minute
    pattern  = pattern.slice(0,5) + `/${blockInfo.time}` + pattern.slice(5, pattern.length);

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