import scheduler from 'node-schedule'

//polymorf function
export default function taskScheduleCreator(...arg){

         //continuous or not
        if(arguments.length > 3){
            return createRegularTask(...arg);
        }else{
            return createSpecialTask(...arg);
        }
 
}

// for playback content
function createRegularTask(startTime, endTime, element, action) {

    console.log(element.name);

    if( element.playbackMode === 1 ){
    
        const pattern = createCrontabPattern(startTime);
        console.log(pattern);
        return scheduler.scheduleJob(element.name, pattern, action);
        
    }else{

        const pattern = createCrontabPattern(startTime, endTime, element.blockInfo);
        console.log(pattern);
        return scheduler.scheduleJob(element.name, pattern, action);

    }
    
}

// for special tasks: stop, mute, etc
function createSpecialTask(time, name, action) {
    
    const pattern = createCrontabPattern(time);
    return scheduler.scheduleJob(name, pattern, action);

}


function createCrontabPattern(){

    const startTime = {};
    const endTime = {};
    let blockInfo; 


    if(arguments.length < 2 ){
        [startTime.hours, startTime.minutes, startTime.seconds] = arguments[0].split(":");
        const pattern = `${startTime.seconds} ${startTime.minutes} ${startTime.hours} * * *`;
        return pattern;
    }else{
        [startTime.hours, startTime.minutes, startTime.seconds] = arguments[0].split(":");
        [endTime.hours, endTime.minutes, endTime.seconds] = arguments[1].split(":");
        blockInfo = arguments[2];
    }

    let pattern = `${startTime.seconds} ${startTime.minutes}`;

    //add hours

    pattern += midnigthHandler(startTime, endTime);

    //format

    pattern += " * * *"

    // every hour
    if(blockInfo.timeType){
        pattern = pattern.slice(0,8) + `/${blockInfo.time} ` + pattern.slice(8, pattern.length);
        return pattern
    }

    //every n-minute
    pattern = pattern.slice(0,5) + `/${blockInfo.time} ` + pattern.slice(5, pattern.length);

    console.log("THIS IS PATTERN ", pattern);

    return pattern;


}

//if schedule start before and finish after midnight
function midnigthHandler(startTime, endTime){
    console.log("MIGHTNIGHT HANDLER ", endTime);
    //handle only hours part
    if(startTime.hours > endTime.hours){
        const beforeMidnigthPart = `${startTime.hours}-23`;
        const afterMidnightPart = endTime.hours > "01" ? `00-${endTime.hours}` : "00";
        return `${beforeMidnigthPart},${afterMidnightPart}`;
    }else{
        return `${startTime.hours}-${endTime.hours}`;
    }
}
