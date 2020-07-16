import { connect } from 'react-redux';
import Player from '../components/Player';
import { setPlaylistPosition } from '../actions/action';
import { push } from 'connected-react-router';



const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    track: (trackName) => dispatch(setPlaylistPosition(trackName)),
    logout: () => dispatch(push("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
