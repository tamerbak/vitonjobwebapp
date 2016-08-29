"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var appDispatcher_1 = require('../dispatcher/appDispatcher');
var remoteValidationConstants_1 = require('../constants/remoteValidationConstants');
var events_1 = require('events');
var CHANGE_EVENT = 'change';
var _isPhoneNumberExist = null;
function getPhoneNumberState(response) {
    console.log(response);
    if (!response || response.data.length == 0) {
        _isPhoneNumberExist = false;
    }
    else {
        _isPhoneNumberExist = true;
    }
}
var RemoteValidationStoreClass = (function (_super) {
    __extends(RemoteValidationStoreClass, _super);
    function RemoteValidationStoreClass() {
        _super.apply(this, arguments);
    }
    RemoteValidationStoreClass.prototype.emitChange = function () {
        this.emit(CHANGE_EVENT);
    };
    RemoteValidationStoreClass.prototype.addChangeListener = function (callback) {
        this.on(CHANGE_EVENT, callback);
    };
    RemoteValidationStoreClass.prototype.removeChangeListener = function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    };
    RemoteValidationStoreClass.prototype.isPhoneNumberExist = function () {
        return _isPhoneNumberExist;
    };
    return RemoteValidationStoreClass;
}(events_1.EventEmitter));
var RemoteValidationStore = new RemoteValidationStoreClass();
RemoteValidationStore.dispatchToken = appDispatcher_1.default.register(function (action) {
    switch (action.actionType) {
        case remoteValidationConstants_1.default.USER_BY_PHONE_CASE:
            getPhoneNumberState(action.response);
            RemoteValidationStore.emitChange();
            break;
        case remoteValidationConstants_1.default.ERROR_CASE:
            console.log("error executing request: " + action.message, action.error);
            RemoteValidationStore.emitChange();
            break;
        default:
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RemoteValidationStore;
//# sourceMappingURL=remoteValidationStore.js.map