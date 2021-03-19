import { SET_SCHEDULE,
         SET_LAST_MODIFIED,
         SET_CHANNEL_TIME } from '../actions/actionTypes';


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
case SET_LAST_MODIFIED:
return ({
  ...state,
  channelTime: action.payload
});
default:
    return state;
}
}