import { connect } from 'react-redux';
import Player from '../components/Player copy';
import { setPlaylistPosition,
         setCurrentChannel,
         downloadStatus } from '../../store/actions/playerActions';
import { push } from 'connected-react-router';


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(push("/"))
  };
};

// какие ещё аргументы можно передать в функцию connect?
export default connect(mapStateToProps, mapDispatchToProps)(Player);
