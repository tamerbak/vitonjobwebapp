import AppDispatcher from '../dispatcher/appDispatcher';
import RemoteValidationConstants from '../constants/remoteValidationConstants';
import AuthServices from '../services/authenticationServices';

export default {
  //Action: verify if a value exist in a list of objects
  listHasValue:( list:{value:string,label:string}[],val:string) => {
    if(list == null){
      return false;
    }else{
    var i = list.length;
    while (i--) {
       if (list[i].value === val) {
           return true;
       }
    }
    return false;
    }
  },

  isEmailValid:(email:string) => {
    var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReg.test(email);
  }

}
