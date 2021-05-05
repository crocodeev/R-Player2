import { connect } from 'react-redux';
import Player from '../components/Player';
import { push } from 'connected-react-router';



const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(push("/"))
  };
};

// какие ещё аргументы можно передать в функцию connect?
export default connect(null, mapDispatchToProps)(Player);
