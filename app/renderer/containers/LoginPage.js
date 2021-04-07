import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';
import userActions from '../../store/actions/user';

console.log(userActions.login);

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const user = bindActionCreators(userActions, dispatch);
  return {
    onLogin: (data) => {
      user.login(data);
      dispatch(push('/loggedin'));
    },
    onPlayer: () => {
      dispatch(push('/player'));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

