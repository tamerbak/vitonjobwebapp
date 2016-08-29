"use strict";
var appDispatcher_1 = require('../dispatcher/appDispatcher');
var authConstants_1 = require('../constants/authConstants');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    logUserIn: function (data) {
        appDispatcher_1.default.dispatch({
            actionType: authConstants_1.default.LOGIN_CASE,
            data: data
        });
    },
    logUserOut: function () {
        appDispatcher_1.default.dispatch({
            actionType: authConstants_1.default.LOGOUT_CASE
        });
    }
};
//# sourceMappingURL=authenticationActions.js.map