import ApiURLs from '../configs/apiUrls';
import * as request from "superagent";


export default {
  //Service : get the country calling codes list from the server
  getCountryCallingCodes: () => {
    var sql = "SELECT nom, indicatif_telephonique FROM user_pays ORDER BY nom";
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
