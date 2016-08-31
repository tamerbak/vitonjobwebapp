"use strict";
var appDispatcher_1 = require('../dispatcher/appDispatcher');
var authConstants_1 = require('../constants/authConstants');
var authServices_1 = require('../services/authServices');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    logUserIn: function (profile, token) {
        appDispatcher_1.default.dispatch({
            actionType: authConstants_1.default.LOGIN_CASE,
            profile: profile,
            token: token
        });
    },
    logUserOut: function () {
        appDispatcher_1.default.dispatch({
            actionType: authConstants_1.default.LOGOUT_CASE
        });
    },
    VerifyUserByPhone: function (phoneNumber) {
        authServices_1.default
            .getUserByPhone('http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/sql', phoneNumber)
            .then(function (data) {
            appDispatcher_1.default.dispatch({
                actionType: authConstants_1.default.V_CASE,
                data: data
            });
        })
            .catch(function (data) {
            appDispatcher_1.default.dispatch({
                actionType: authConstants_1.default.X_CASE,
                data: data
            });
        });
    }
};
//# sourceMappingURL=AuthActions.js.map