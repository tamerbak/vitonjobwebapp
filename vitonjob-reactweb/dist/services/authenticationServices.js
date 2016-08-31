"use strict";
var apiUrls_1 = require('../configs/apiUrls');
var request = require("superagent");
var md5_1 = require('ts-md5/dist/md5');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Athenticate: function (index, phoneNumber, password, email, role) {
        var fullPhoneNumber = "+" + index + phoneNumber;
        var passwordHash = md5_1.Md5.hashStr(password);
        var login = {
            'class': 'com.vitonjob.callouts.auth.AuthToken',
            'email': email,
            'telephone': fullPhoneNumber,
            'password': passwordHash,
            'role': role
        };
        var loginStr = JSON.stringify(login);
        var encodedLogin = btoa(loginStr);
        var dataLog = {
            'class': 'fr.protogen.masterdata.model.CCallout',
            'id': 214,
            'args': [{
                    'class': 'fr.protogen.masterdata.model.CCalloutArguments',
                    label: 'requete authentification',
                    value: encodedLogin
                }]
        };
        var body = JSON.stringify(dataLog);
        return new Promise(function (resolve, reject) {
            request
                .post(apiUrls_1.default.CALLOUT_URL)
                .send(body)
                .set('Content-Type', 'application/json')
                .end(function (err, response) {
                if (err)
                    reject(err);
                resolve(JSON.parse(response.text));
            });
        });
    },
    getUserByPhone: function (phoneNumber) {
        var sql = "select pk_user_account, email, role from user_account where telephone = '" + phoneNumber + "'";
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
    },
    getUserByEmail: function (email) {
        var sql = "select pk_user_account, email, telephone, role from user_account where LOWER(email) = lower_unaccent('" + email + "')";
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
//# sourceMappingURL=authenticationServices.js.map