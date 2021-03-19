
import { SET_SCHEDULE,
         SET_LAST_MODIFIED,
         SET_CHANNEL_TIME } from './actionTypes';


export function setSchedule(schedule){
return {
type: SET_SCHEDULE,
payload: schedule
}
}

export function setLastModified(lastModified){
return {
type: SET_LAST_MODIFIED,
payload: lastModified
}
}

export function setChannelRules(channelRules){
return {
type: SET_CHANNEL_TIME,
payload: channelRules
}
}
