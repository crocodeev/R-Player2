import { futimesSync } from 'fs';
import scheduler from 'node-schedule'
import timeComparator from './timeComparator'

export default function taskScheduleCreator(channelRule, CampaignRule, job){


    const channelTime = channelRule.start
    const campaignTime = channelRule.start

    const pattern = createCrontabPattern(channelRule, CampaignRule);
    console.log(pattern);

    return scheduler.scheduleJob(pattern, job);

}

function createCrontabPattern(channelRule, CampaignRule){

    const timeFromChannel = channelRule.start;
    const timeFromCampaign = CampaignRule;

    const compareTime = timeComparator(timeFromChannel, timeFromCampaign);
    const readyTime = new TimeParse(compareTime);
    const pattern = `${readyTime.getSeconds()} ${readyTime.getMinutes()} ${readyTime.getHours()} * * *`;
    console.log(pattern);
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