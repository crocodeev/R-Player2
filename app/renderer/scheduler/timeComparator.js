
function toHHMMSS(obj){

    

    const HH = toLeadingZero(obj.hour) + ":";
    const MM = toLeadingZero(obj.minutes) + ":";
    const SS = "00"
    //const SS = toLeadingZero(second);

    return HH + MM + SS;
 
}

function toLeadingZero(timeUnit = 0){
    return timeUnit < 10 ? "0" + timeUnit : timeUnit.toString()
}


export default function timeComparator(timeFromSchedule, timeFromChannelRule) {

    //const formatedTimeFromSchedule = toHHMMSS(timeFromSchedule);

    return timeFromSchedule < timeFromChannelRule ? timeFromChannelRule : timeFromSchedule;
}

