import { SET_SCHEDULE,
         SET_LAST_MODIFIED,
         SET_CHANNEL_TIME,
         SET_NEXT_SCHEDULE } from '../actions/actionTypes';


export default function scheduleReducer(state = {}, action){

switch (action.type) {
case SET_SCHEDULE:
return ({
  ...state,
  schedule: action.payload
});
case SET_LAST_MODIFIED:
return ({
  ...state,
  lastModified: action.payload
});
case SET_CHANNEL_TIME:
return ({
  ...state,
  channelRule: action.payload
});
case SET_NEXT_SCHEDULE:
return ({
  ...state,
  nextSchedule: action.payload
});
default:
    return state;
}
}