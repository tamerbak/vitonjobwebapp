"use strict";
var appDispatcher_1 = require('../dispatcher/appDispatcher');
var remoteValidationConstants_1 = require('../constants/remoteValidationConstants');
var authenticationServices_1 = require('../services/authenticationServices');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getUserByPhone: function (countryCode, phoneNumber) {
        var fullPhoneNumber = "+" + countryCode + phoneNumber;
        authenticationServices_1.default
            .getUserByPhone(fullPhoneNumber)
            .then(function (res) {
            appDispatcher_1.default.dispatch({
                actionType: remoteValidationConstants_1.default.USER_BY_PHONE_CASE,
                response: res
            });
        })
            .catch(function (err) {
            appDispatcher_1.default.dispatch({
                actionType: remoteValidationConstants_1.default.ERROR_CASE,
                error: err,
                message: "getting User By phone"
            });
        });
    }
};
//# sourceMappingURL=remoteValidationActions.js.map