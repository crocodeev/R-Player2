
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

// compare start or end?
const TypeEnum = Object.freeze({
    start: "start",
    end: "end"
});

export default function timeComparator(timeFromSchedule, timeFromChannelRule, type) {

    //const formatedTimeFromSchedule = toHHMMSS(timeFromSchedule);

    switch (type) {
        case TypeEnum.start:
            return timeFromSchedule < timeFromChannelRule ? timeFromChannelRule : timeFromSchedule;
            break;
        case TypeEnum.end:
            return timeFromSchedule > timeFromChannelRule ? timeFromChannelRule : timeFromSchedule;
            break;    
        default:
            throw new Error(`Time comparator: time type is ${type}`);
            break;
    }
}

