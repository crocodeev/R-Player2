import { connect } from 'react-redux';
import Player from '../components/Player';
import { push } from 'connected-react-router';
import rpc from '../../api/renderProccessConnector';
import sound from '../sound/soundEmmiter';
import soundPlaybackController from '../sound/soundPlaybackController';
import Scheduler from '../scheduler/scheduler';

const playbackController = new soundPlaybackController(sound);
const scheduler = new Scheduler();


const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      scheduler.clearTaskQueue();
      playbackController.stopAndClear();
      rpc.cancelDownload();
      dispatch(push("/"));
    }
  };
};

// какие ещё аргументы можно передать в функцию connect?
export default connect(null, mapDispatchToProps)(Player);
