"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    listHasValue: function (list, val) {
        if (list == null) {
            return false;
        }
        else {
            var i = list.length;
            while (i--) {
                if (list[i].value === val) {
                    return true;
                }
            }
            return false;
        }
    },
    isEmailValid: function (email) {
        var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailReg.test(email);
    }
};
//# sourceMappingURL=utils.js.map