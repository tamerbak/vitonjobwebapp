import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";

@Injectable()
export class SystemService {

  constructor(public http: Http) {
  }

  checkVersion(version : string){
    let sql = "select value from s_application_parameters where key='VOJ_VERSION'";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          if(!data || !data.data || data.data.length == 0)
            resolve(false);
          else{
            resolve(data.data[0].value==version);
          }
        });
    });
  }
}
