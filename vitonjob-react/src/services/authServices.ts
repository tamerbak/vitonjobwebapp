import ApiURLs from '../configs/apiUrls';
import * as request from "superagent";

export default {

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

  }



}
