import { push } from 'connected-react-router';
import soundPlaybackController from '../../renderer/sound/soundPlaybackController';


export default function logout(store, scheduler, sound, rpcCallback) {

    const playbackController = new soundPlaybackController(sound);
    scheduler.clearTaskQueue();
    playbackController.stopAndClear();
    rpcCallback();
    store.dispatch(push("/"));

}