import {Injectable} from "@angular/core";
import {Configs} from "../configurations/configs";
import {Http} from "@angular/http";

/**
 * @author daoudi amine
 * @description services for user
 * @module User
 */
@Injectable()
export class UserService {
    configuration: any;


    constructor(public http: Http) {
    }

    updateGCStatus(status, contacted, userid, role) {
        let sql = "update user_account set accepte_les_cgu='" + status + "', contacte_pour_refus='" + contacted + "' " +
            "where pk_user_account='" + userid + "'";
        this.configuration = Configs.setConfigs(role);
        return new Promise(resolve => {
            let headers = Configs.getHttpTextHeaders();
            this.http.post(this.configuration.sqlURL, sql, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
}

