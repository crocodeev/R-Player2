import { SET_SCHEDULE } from '../actions/actionTypes';


export default function scheduleReducer(state = {}, action){

switch (action.type) {
case SET_SCHEDULE:
return ({
  ...state,
  schedule: action.payload
});
default:
    return state;
}
}