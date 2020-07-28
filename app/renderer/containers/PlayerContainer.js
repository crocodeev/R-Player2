import { connect } from 'react-redux';
import Player from '../components/Player';
import { setPlaylistPosition,
         setCurrentChannel } from '../actions/action';
import { push } from 'connected-react-router';


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    track: (trackName) => dispatch(setPlaylistPosition(trackName)),
    channel: (channelId) => dispatch(setCurrentChannel(channelId)),
    logout: () => dispatch(push("/"))
  };
};

// какие ещё аргументы можно передать в функцию connect?
export default connect(mapStateToProps, mapDispatchToProps)(Player);
