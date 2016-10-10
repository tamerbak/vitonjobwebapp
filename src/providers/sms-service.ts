import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Configs} from "../configurations/configs";


/**
 * @author daoudi amine
 * @description services for contracts yousign
 * @module Contract
 */
@Injectable()
export class SmsService{
  constructor(public http: Http){
  }

  /**
   * @description call yousign service
   * @param employer
   * @param jobyer
   * @return JSON results in form of offers
   */
  sendSms(phoneNumber: String, message: String){
    if (phoneNumber.charAt(0) == '+') {
      phoneNumber = phoneNumber.substring(1);
    }
    phoneNumber = "00" + phoneNumber;

    //only for test
    //phoneNumber = "00212672435408";
    var soapMessage =
      '<fr.protogen.connector.model.SmsModel>' +
      '<telephone>' + phoneNumber + '</telephone>' +
      '<text>' + message + '</text>' +
      '</fr.protogen.connector.model.SmsModel>';

    return new Promise(resolve =>{
      let headers = new Headers();
      headers = Configs.getHttpXmlHeaders();

      this.http.post(Configs.smsURL, soapMessage, {headers: headers})
        .map(res => res)
        .subscribe(data =>{
          resolve(data);
        });
    });
  }
}