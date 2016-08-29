import AppDispatcher from '../dispatcher/appDispatcher';
import AuthConstants from '../constants/authConstants';

import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

function setUser(profile:any, token:any) {
  if (!localStorage.getItem('id_token')) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', token);
  }
}

function removeUser() {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
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
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }

  getUser() {
    return localStorage.getItem('profile');
  }

  getJwt() {
    return localStorage.getItem('id_token');
  }
}

const AuthStore = new AuthStoreClass();

//we register a callback for the dispatcher
AuthStore.dispatchToken = AppDispatcher.register((action:any) => {

  switch(action.actionType) {

    case AuthConstants.LOGIN_CASE:
      setUser(action.profile, action.token);
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
