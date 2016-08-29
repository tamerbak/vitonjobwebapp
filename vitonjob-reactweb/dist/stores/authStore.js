"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var appDispatcher_1 = require('../dispatcher/appDispatcher');
var authConstants_1 = require('../constants/authConstants');
var events_1 = require('events');
var CHANGE_EVENT = 'change';
function setUser(profile, token) {
    if (!localStorage.getItem('id_token')) {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', token);
    }
}
function removeUser() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
}
var AuthStoreClass = (function (_super) {
    __extends(AuthStoreClass, _super);
    function AuthStoreClass() {
        _super.apply(this, arguments);
    }
    AuthStoreClass.prototype.emitChange = function () {
        this.emit(CHANGE_EVENT);
    };
    AuthStoreClass.prototype.addChangeListener = function (callback) {
        this.on(CHANGE_EVENT, callback);
    };
    AuthStoreClass.prototype.removeChangeListener = function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    };
    AuthStoreClass.prototype.isAuthenticated = function () {
        if (localStorage.getItem('id_token')) {
            return true;
        }
        return false;
    };
    AuthStoreClass.prototype.getUser = function () {
        return localStorage.getItem('profile');
    };
    AuthStoreClass.prototype.getJwt = function () {
        return localStorage.getItem('id_token');
    };
    return AuthStoreClass;
}(events_1.EventEmitter));
var AuthStore = new AuthStoreClass();
AuthStore.dispatchToken = appDispatcher_1.default.register(function (action) {
    switch (action.actionType) {
        case authConstants_1.default.LOGIN_CASE:
            setUser(action.profile, action.token);
            AuthStore.emitChange();
            break;
        case authConstants_1.default.LOGOUT_CASE:
            removeUser();
            AuthStore.emitChange();
            break;
        case authConstants_1.default.V_CASE:
            console.log("ok");
            console.log(action.data);
            AuthStore.emitChange();
            break;
        case authConstants_1.default.X_CASE:
            console.log("non");
            console.log(action.data);
            AuthStore.emitChange();
            break;
        default:
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthStore;
//# sourceMappingURL=AuthStore.js.map