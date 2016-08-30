import AppDispatcher from '../dispatcher/appDispatcher';
import RemoteValidationConstants from '../constants/remoteValidationConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _isPhoneNumberExist:boolean = null;
var _isEmailExist:boolean = null;

function initializeStates() {
  _isPhoneNumberExist = null;
  _isEmailExist = null;
}

function setPhoneNumberState(response:any) {
  if (!response || response.data.length == 0) {
    _isPhoneNumberExist = false;
  }else{
    _isPhoneNumberExist = true;
  }
}

function setEmailState(response:any) {
  if (!response || response.data.length == 0) {
    _isEmailExist = false;
  }else{
    _isEmailExist = true;
  }
}


class RemoteValidationStoreClass extends EventEmitter {
  dispatchToken:string;

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback:any) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback:any) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  isPhoneNumberExist() {
    return _isPhoneNumberExist;
  }

  isEmailExist() {
    return _isEmailExist;
  }

}

const RemoteValidationStore = new RemoteValidationStoreClass();

// register a callback for the dispatcher and respond appropriately to various action types
RemoteValidationStore.dispatchToken = AppDispatcher.register((action:any) => {

  switch(action.actionType) {
    case RemoteValidationConstants.INITIALIZE_CASE:
      initializeStates();
      //RemoteValidationStore.emitChange();
      break;

    case RemoteValidationConstants.USER_BY_PHONE_CASE:
      setPhoneNumberState(action.response);
      RemoteValidationStore.emitChange();
      break;

    case RemoteValidationConstants.USER_BY_EMAIL_CASE:
      setEmailState(action.response);
      RemoteValidationStore.emitChange();
      break;

    case RemoteValidationConstants.ERROR_CASE:
      console.log(action.message,action.error );
      RemoteValidationStore.emitChange();
      break;

    default:
  }



});

export default RemoteValidationStore;
