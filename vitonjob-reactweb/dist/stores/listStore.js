"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var appDispatcher_1 = require('../dispatcher/appDispatcher');
var listConstants_1 = require('../constants/listConstants');
var events_1 = require('events');
var CHANGE_EVENT = 'change';
var _countryCodes = [];
function fillCountryCallingCodeList(response) {
    _countryCodes = [];
    var data = response.data;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var obj = data_1[_i];
        _countryCodes.push({
            value: obj.indicatif_telephonique,
            label: obj.nom
        });
    }
}
var ListStoreClass = (function (_super) {
    __extends(ListStoreClass, _super);
    function ListStoreClass() {
        _super.apply(this, arguments);
    }
    ListStoreClass.prototype.emitChange = function () {
        this.emit(CHANGE_EVENT);
    };
    ListStoreClass.prototype.addChangeListener = function (callback) {
        this.on(CHANGE_EVENT, callback);
    };
    ListStoreClass.prototype.removeChangeListener = function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    };
    ListStoreClass.prototype.getCountryCallingsCodes = function () {
        return _countryCodes;
    };
    return ListStoreClass;
}(events_1.EventEmitter));
var ListStore = new ListStoreClass();
ListStore.dispatchToken = appDispatcher_1.default.register(function (action) {
    switch (action.actionType) {
        case listConstants_1.default.COUNTRY_CODES_CASE:
            fillCountryCallingCodeList(action.response);
            ListStore.emitChange();
            break;
        case listConstants_1.default.ERROR_GETTING_LIST_CASE:
            console.log("error in getting list: " + action.listName);
            console.log(action.error);
            ListStore.emitChange();
            break;
        default:
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListStore;
//# sourceMappingURL=listStore.js.map