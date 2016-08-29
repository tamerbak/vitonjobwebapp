import AppDispatcher from '../dispatcher/appDispatcher';
import AuthConstants from '../constants/authConstants';

import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

function setUser(data:any) {
  if (!localStorage.getItem('user_id')) {
    localStorage.setItem('user_id', data.id);
  }
}

function removeUser() {
  localStorage.removeItem('user_id');
}

class AuthStoreClass extends EventEmitter {
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

  isAuthenticated() {
    if (localStorage.getItem('user_id')) {
      return true;
    }
    return false;
  }

  getUserId() {
    return localStorage.getItem('user_id');
  }

}

const AuthStore = new AuthStoreClass();

// register a callback for the dispatcher and respond appropriately to various action types
AuthStore.dispatchToken = AppDispatcher.register((action:any) => {

  switch(action.actionType) {

    case AuthConstants.LOGIN_CASE:
      setUser(action.data);
      AuthStore.emitChange();
      break

    case AuthConstants.LOGOUT_CASE:
      removeUser();
      AuthStore.emitChange();
      break

    default:
  }


});

export default AuthStore;
