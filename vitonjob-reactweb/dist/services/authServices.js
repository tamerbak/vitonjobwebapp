"use strict";
var request = require("superagent");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getUserByPhone: function (url, phoneNumber) {
        var sql = "select pk_user_account, email, role from user_account where telephone = '" + phoneNumber + "'";
        return new Promise(function (resolve, reject) {
            request
                .post(url)
                .send(sql)
                .set('Content-Type', 'text/plain')
                .end(function (err, response) {
                console.log(err, response);
                if (err)
                    reject(err);
                resolve(response);
                console.log(response);
            });
        });
    }
};
//# sourceMappingURL=authServices.js.map