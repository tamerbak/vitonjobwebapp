import AppDispatcher from '../dispatcher/appDispatcher';
import RemoteValidationConstants from '../constants/remoteValidationConstants';
import AuthServices from '../services/authenticationServices';

export default {
  //Action: initialize states of validations values
  initialize:() => {
    AppDispatcher.dispatch({
      actionType: RemoteValidationConstants.INITIALIZE_CASE
    });
  },

  //verify if the user exists by his phoneNumber
  getUserByPhone: (countryCode:string,phoneNumber:string) => {
    var fullPhoneNumber = "+"+countryCode+phoneNumber;
    AuthServices
    .getUserByPhone(fullPhoneNumber)
      .then((res:any) => {
        //Action: fetching done
        AppDispatcher.dispatch({
          actionType: RemoteValidationConstants.USER_BY_PHONE_CASE,
          response: res
        });
      })
      .catch((err:any) => {
        //Action: fetching error
        AppDispatcher.dispatch({
          actionType: RemoteValidationConstants.ERROR_CASE,
          error: err,
          message: "error in getting user by phonenumber",
        });
      });
  },

  //verify if the user exists by his email
  getUserByEmail: (email:string) => {
    AuthServices
    .getUserByEmail(email)
      .then((res:any) => {
        //Action: fetching done
        AppDispatcher.dispatch({
          actionType: RemoteValidationConstants.USER_BY_EMAIL_CASE,
          response: res
        });
      })
      .catch((err:any) => {
        //Action: fetching error
        AppDispatcher.dispatch({
          actionType: RemoteValidationConstants.ERROR_CASE,
          error: err,
          message: "error in getting user by email",
        });
      });
  }

}
