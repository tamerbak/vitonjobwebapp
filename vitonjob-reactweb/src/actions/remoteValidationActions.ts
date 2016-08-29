import AppDispatcher from '../dispatcher/appDispatcher';
import RemoteValidationConstants from '../constants/remoteValidationConstants';
import AuthServices from '../services/authenticationServices';

export default {

  // Action : verify if the user exists by his phoneNumber
  getUserByPhone: (countryCode:string,phoneNumber:string) => {
    var fullPhoneNumber = "+"+countryCode+phoneNumber;
    AuthServices
    .getUserByPhone(fullPhoneNumber)
      .then((res:any) => {
        AppDispatcher.dispatch({
          actionType: RemoteValidationConstants.USER_BY_PHONE_CASE,
          response: res
        });
      })
      .catch((err:any) => {
        AppDispatcher.dispatch({
          actionType: RemoteValidationConstants.ERROR_CASE,
          error: err,
          message: "getting User By phone"
        });
      });
  }

}
