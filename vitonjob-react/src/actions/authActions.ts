import AppDispatcher from '../dispatcher/appDispatcher';
import AuthConstants from '../constants/authConstants';
import AuthServices from '../services/authenticationServices';

export default {

  logUserIn: (profile:any, token:any) => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_CASE,
      profile: profile,
      token: token
    });
  },

  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_CASE
    });
  }
}
