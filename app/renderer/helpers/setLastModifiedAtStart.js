import createDateStamp from './createDateStamp';
import { setLastModified } from '../../store/actions/scheduleActions';

export default function setLastModifiedAtStart(store) {

    const currentStamp = store.getState().store.getState().schedule.lastModified;

    //check if really not fisrt start

    if(!currentStamp){

        const stamp = createDateStamp();

        store.dispath(setLastModified(stamp));
    }
}