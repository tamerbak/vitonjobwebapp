"use strict";
var apiUrls_1 = require('../configs/apiUrls');
var request = require("superagent");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getCountryCallingCodes: function () {
        var sql = "SELECT nom, indicatif_telephonique FROM user_pays ORDER BY nom";
        return new Promise(function (resolve, reject) {
            request
                .post(apiUrls_1.default.SQL_URL)
                .send(sql)
                .set('Content-Type', 'text/plain')
                .end(function (err, response) {
                if (err)
                    reject(err);
                resolve(JSON.parse(response.text));
            });
        });
    }
};
//# sourceMappingURL=listServices.js.map