import { connect } from 'react-redux';
import Player from '../components/Player';
import { setPlaylistPosition } from '../actions/action';



const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    track: (trackName) => dispatch(setPlaylistPosition(trackName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
