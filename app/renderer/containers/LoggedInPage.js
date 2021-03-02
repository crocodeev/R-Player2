import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import LoggedIn from '../components/LoggedIn';
//import userActions from '../../store/actions/user';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (data) => {
      dispatch(push('/'));
    },
    onPlayer:() => {
      dispatch('/player')
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
