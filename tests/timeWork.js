const timeFromChannel = '09:01:00'

const hours = 10
const minutes = 0

function toHHMMSS(hour, minute, second = 0 ){

    const HH = toLeadingZero(hour) + ":";
    const MM = toLeadingZero(minute) + ":";
    const SS = toLeadingZero(second);

    return HH + MM + SS;
 
}

function toLeadingZero(timeUnit){
    return timeUnit < 10 ? "0" + timeUnit : timeUnit.toString()
}


function compare(timeFromChannel, timeFromSchedule) {

    return timeFromChannel > timeFromSchedule;
}


compare(timeFromChannel, toHHMMSS(10,0,34))