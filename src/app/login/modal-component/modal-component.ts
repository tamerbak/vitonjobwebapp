import {Component, Input} from "@angular/core";
import {AuthenticationService} from "../../../providers/authentication.service";
import {AlertComponent} from "ng2-bootstrap/components/alert";

declare function md5(value: string): string;
declare var jQuery: any;

@Component({
  selector: '[modal-component]',
  template: require('./modal-component.html'),
  directives: [AlertComponent]
})

export class ModalComponent{
  @Input()
  index: number;
  @Input()
  phone: number;
  @Input()
  email: string;
  @Input()
  showEmailField: boolean;
  @Input()
  isRecruteur: boolean;
  @Input()
  isRoleTelConform: boolean;
  @Input()
  isPhoneNumValid: boolean;

  displayedMsg: string;
  isSent: boolean = false;
  alerts: Array<Object>;
  hideLoader: boolean = true;

  constructor(private authService: AuthenticationService) {
    this.isPhoneNumValid = !this.isEmpty(this.phone);
  }

  /**
   * @description validate the phone format
   */
  isPhoneValid() {
    if (this.phone) {
      var phone_REGEXP = /^0/;
      //check if the phone number start with a zero
      var isMatchRegex = phone_REGEXP.test(this.phone.toString());
      if (Number(this.phone.toString().length) == 9 && !isMatchRegex) {
        return true;
      }
      else
        return false;
    } else
      return false;
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  sendSMS() {
    this.passwordForgotten("sms", "");
  }

  sendEmail() {
    this.passwordForgotten("email", this.email);
  }


  passwordForgotten(canal, email) {
    debugger;
    var tel = "+" + this.index + this.phone;
    this.hideLoader = false;
    this.authService.setNewPassword(tel).then((data: any) => {
      if (!data) {
        this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
        return;
      }
      if (data && data.password.length != 0) {
        let newPasswd = data.password;
        if (canal == 'sms') {
          this.authService.updatePasswordByPhone(tel, md5(newPasswd),"Oui").then((data) => {
            if (!data) {
              this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
              return;
            }
            this.authService.sendPasswordBySMS(tel, newPasswd).then((data: any) => {
              if (!data || data.status != 200) {
                this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
                return;
              } else {
                this.isSent = true;
                this.displayedMsg = "Votre mot de passe a été réinitialisé. Vous recevrez un SMS avec un nouveau mot de passe d'ici peu."
              }
            });
          });
        } else {
          this.authService.updatePasswordByMail(email, md5(newPasswd),"Oui").then((data: any) => {
            if (!data) {
              this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
              return;
            }
            this.authService.sendPasswordByEmail(email, newPasswd).then((data: any) => {
              if (!data || data.status != 200) {
                this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
                return;
              } else {
                this.isSent = true;
                this.displayedMsg = "Votre mot de passe a été réinitialisé. Vous recevrez un courrier électronique avec un nouveau mot de passe d'ici peu."
              }
            });
          });
        }
      }
    })
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
  close(): void {
    jQuery('#my-modal18-content').modal('hide');
    this.isSent = false;
    this.hideLoader = true;
    this.phone = null;
    this.index = 33;
  }
}
