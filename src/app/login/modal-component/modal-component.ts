import {Component} from "@angular/core";
import {LoadListService} from "../../../providers/load-list.service";
import {AuthenticationService} from "../../../providers/authentication.service";
import {AlertComponent} from "ng2-bootstrap/components/alert";

declare function md5(value: string): string;
declare var jQuery: any;

@Component({
  selector: '[modal-component]',
  template: require('./modal-component.html'),
  directives: [AlertComponent]
})
export class ModalComponent {
  displayedMsg: string;

  index: number;
  phone: number;
  email: string;
  role: string;
  pays = [];

  isIndexValid = true;
  isPhoneNumValid = true;
  showEmailField: boolean;
  isRecruteur: boolean = false;

  isSent: boolean = false;
  alerts: Array<Object>;
  hideLoader: boolean = true;

  constructor(private loadListService: LoadListService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.index = 33;
    this.role = "employer";
    //load countries list
    this.loadListService.loadCountries(this.role).then((data: any) => {
      this.pays = data.data;
    });
  }

  /**
   * @description validate phone data field and call the function that search for it in the server
   */
  watchPhone(e) {
    if (this.phone) {
      if (e.target.value.substring(0, 1) == '0') {
        e.target.value = e.target.value.substring(1, e.target.value.length);
      }
      if (e.target.value.length > 9) {
        e.target.value = e.target.value.substring(0, 9);
      }
      if (e.target.value.length == 9) {
        this.isRegistration(this.index, e.target.value);
        this.isPhoneNumValid = true;
      }
    }
  }

  /**
   * @description function called when the phone input is valid to decide if the form is for inscription or authentication
   */
  isRegistration(index, phone) {
    if (this.isPhoneValid(phone)) {
      //On teste si le tél existe dans la base
      var tel = "+" + index + phone;
      this.authService.getUserByPhone(tel, this.role).then((data: any) => {
        if (!data || data.status == "failure") {
          this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
          return;
        }
        if (!data || data.data.length == 0) {
          this.showEmailField = true;
          this.email = "";
        } else {
          this.email = data.data[0]["email"];
          this.showEmailField = false;
          if (data.data[0]["role"] == "recruteur" && this.role == "employer") {
            this.isRecruteur = true;
            this.email = "";
          }
        }
      });
    } else {
      //ça sera toujours une connexion
      this.showEmailField = true;
      this.email = "";
      this.isRecruteur = false;
    }
  }

  /**
   * @description validate the phone format
   */
  isPhoneValid(tel) {
    if (this.phone) {
      var phone_REGEXP = /^0/;
      //check if the phone number start with a zero
      var isMatchRegex = phone_REGEXP.test(tel);
      if (Number(tel.toString().length) == 9 && !isMatchRegex) {
        return true;
      }
      else
        return false;
    } else
      return false;
  }

  validatePhone(e) {
    if (e.target.value.length == 9) {
      this.isPhoneNumValid = true;
    } else {
      this.isPhoneNumValid = false;
    }
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  showAlerts() {
    if (!this.phone || !this.isPhoneValid(this.phone)) {
      this.addAlert("danger", "Veuillez saisir un numéro de téléphone valide.");
      return true;
    }
    if (this.phone && this.isPhoneValid(this.phone) && this.showEmailField) {
      this.addAlert("warning", "Le numéro que vous avez saisi ne correspond à aucun compte enregistré. Veuillez créer un compte.");
      return true;
    }
    return false;
  }

  sendSMS() {
    if (this.showAlerts()) {
      return;
    }
    this.passwordForgotten("sms", "");
  }

  sendEmail() {
    if (this.showAlerts()) {
      return;
    }
    this.passwordForgotten("email", this.email);
  }

  passwordForgotten(canal, email) {
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
          this.authService.updatePasswordByPhone(tel, md5(newPasswd)).then((data) => {
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
          this.authService.updatePasswordByMail(email, md5(newPasswd)).then((data: any) => {
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

  close(): void {
    jQuery('#my-modal18-content').modal('hide');
    this.isSent = false;
    this.hideLoader = true;
    this.phone = null;
    this.index = 33;
  }
}
