
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

