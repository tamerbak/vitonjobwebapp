import AppDispatcher from '../dispatcher/appDispatcher';
import RemoteValidationConstants from '../constants/remoteValidationConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _isPhoneNumberExist:boolean = null;

function getPhoneNumberState(response:any) {
  console.log(response);
  if (!response || response.data.length == 0) {
    _isPhoneNumberExist = false;
  }else{
    _isPhoneNumberExist = true;
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

}

const RemoteValidationStore = new RemoteValidationStoreClass();

// register a callback for the dispatcher and respond appropriately to various action types
RemoteValidationStore.dispatchToken = AppDispatcher.register((action:any) => {

  switch(action.actionType) {

    case RemoteValidationConstants.USER_BY_PHONE_CASE:
      getPhoneNumberState(action.response);
      RemoteValidationStore.emitChange();
      break;

    case RemoteValidationConstants.ERROR_CASE:
      console.log("error executing request: "+ action.message,action.error );
      RemoteValidationStore.emitChange();
      break;

    default:
  }



});

export default RemoteValidationStore;
