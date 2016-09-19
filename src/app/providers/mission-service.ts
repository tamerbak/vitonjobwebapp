import {Injectable} from '@angular/core';
import {Configs} from "../configurations/configs";
import {GlobalConfigs} from '../configurations/globalConfigs';
import {Http, Headers} from '@angular/http';


@Injectable()
export class MissionService {

  constructor(private http:Http) {

  }

  updateDefaultOptionMission(selectedOption, accountId, entrepriseId) {
      var sql = "update user_account set option_mission = '" + selectedOption + "' where pk_user_account = '" + accountId + "'; ";

      return new Promise(resolve => {
          let headers = new Headers();
          headers = Configs.getHttpTextHeaders();
          this.http.post(Configs.sqlURL, sql, {headers: headers})
              .map(res => res.json())
              .subscribe(data => {
                  resolve(data);
              });
      });
  }

  getOptionMission(id){
		var sql = "select option_mission from user_account where pk_user_account = '" + id + "'; "

    return new Promise(resolve => {
        let headers = new Headers();
        headers = Configs.getHttpTextHeaders();
        this.http.post(Configs.sqlURL, sql, {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            });
    });
	}

}
