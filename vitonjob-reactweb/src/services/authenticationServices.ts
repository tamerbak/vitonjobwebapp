import ApiURLs from '../configs/apiUrls';
import * as request from "superagent";
import {Md5} from 'ts-md5/dist/md5';

export default {
  //Service : Authentication service
  Athenticate: (index:string,phoneNumber:string,password:string,email:string,role:string) => {
    var fullPhoneNumber:string = "+"+index+phoneNumber;
    var passwordHash = Md5.hashStr(password);


    var login =
  	{
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


    return new Promise((resolve:any, reject:any) => {
      request
        .post(ApiURLs.CALLOUT_URL)
        .send(body)
        .set('Content-Type', 'application/json')
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });

  },

  //Service : get User by his phonenumber from the server
  getUserByPhone: (phoneNumber:string) => {
    var sql= "select pk_user_account, email, role from user_account where telephone = '"+phoneNumber+"'";
    return new Promise((resolve:any, reject:any) => {
      request
        .post(ApiURLs.SQL_URL)
        .send(sql)
        .set('Content-Type', 'text/plain')
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  },

  //Service : get User by his email from the server
  getUserByEmail: (email:string) => {
    var sql = "select pk_user_account, email, telephone, role from user_account where LOWER(email) = lower_unaccent('"+email+"')";
    return new Promise((resolve:any, reject:any) => {
      request
        .post(ApiURLs.SQL_URL)
        .send(sql)
        .set('Content-Type', 'text/plain')
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  }



}
