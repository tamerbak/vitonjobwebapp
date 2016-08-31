import AppDispatcher from '../dispatcher/appDispatcher';
import AuthConstants from '../constants/authConstants';
import AuthServices from '../services/authenticationServices';

export default {
  //Action : The logUserIn Action
  logUserIn: (data:any) => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_CASE,
      data: data
    });
  },

  //Action : The logUserOut Action
  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_CASE
    });
  }
}
