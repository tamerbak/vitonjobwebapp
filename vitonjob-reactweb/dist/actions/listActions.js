"use strict";
var appDispatcher_1 = require('../dispatcher/appDispatcher');
var listConstants_1 = require('../constants/listConstants');
var listServices_1 = require('../services/listServices');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getCountryCallingCodes: function () {
        listServices_1.default
            .getCountryCallingCodes()
            .then(function (res) {
            appDispatcher_1.default.dispatch({
                actionType: listConstants_1.default.COUNTRY_CODES_CASE,
                response: res
            });
        })
            .catch(function (err) {
            appDispatcher_1.default.dispatch({
                actionType: listConstants_1.default.ERROR_GETTING_LIST_CASE,
                error: err,
                listName: "CountryCallingCodesList",
            });
        });
    }
};
//# sourceMappingURL=listActions.js.map