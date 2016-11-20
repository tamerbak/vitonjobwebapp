import {Component, ViewEncapsulation} from "@angular/core";
import {RecruiterService} from "../../providers/recruiter-service";
import {SharedService} from "../../providers/shared.service";
import {LoadListService} from "../../providers/load-list.service";
import {AuthenticationService} from "../../providers/authentication.service";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {Utils} from "../utils/utils";
import {SmsService} from "../../providers/sms-service";

declare var Messenger:any;

@Component({
  selector: '[recruiter-edit]',
  template: require('./recruiter-edit.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./recruiter-edit.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [RecruiterService, LoadListService, AuthenticationService, SmsService]
})

export class RecruiterEdit {
  projectTarget: string;
  currentUser: any;
  alerts: Array<Object>;
  obj: string;
  index: string;
  firstname: string;
  lastname: string;
  phone: string;
  recruiter: any;
  accountid: number;
  isIndexValid = true;
  isPhoneNumValid = true;
  phoneExist: boolean;
  pays = [];
  email: string;
  emailExist: boolean = false;

  constructor(private sharedService: SharedService,
              public recruiterService: RecruiterService,
              private smsService: SmsService,
              private loadListService: LoadListService,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
    }
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    if (this.projectTarget == "jobyer") {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    //obj = "add" or "detail"
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
    });

    if(this.obj == "detail") {
      this.recruiter = this.sharedService.getCurrentRecruiter();
      this.initializeForm(this.recruiter);
    }else{
      this.index = "33";
    }

    //load countries list
    this.loadListService.loadCountries(this.projectTarget).then((data: any) => {
      this.pays = data.data;
    });
  }

  initializeForm(contact){
    this.firstname = contact.firstname;
    this.lastname = contact.lastname;
    this.index = this.splitPhoneNumber(contact.phone)[0];
    this.phone = this.splitPhoneNumber(contact.phone)[1];
    this.email = contact.email;
    this.accountid = contact.accountid;
  }

  splitPhoneNumber(num){
    var len = num.length;
    var index = num.substring(0, len - 9);
    if(index.startsWith("00")){
      index = index.substring(2, len - 9);
    }
    if(index.startsWith("+")){
      index = index.replace("+", "");
    }
    if(index == 0){
      index = "";
    }
    var phone = num.replace(/\s/g, "").substring(len - 9, len);
    return [index, phone];
  }

  saveContact(obj){
    var contact: any = {};
    contact.firstname = this.firstname;
    contact.lastname = this.lastname;
    contact.phone = "+" + this.index + "" + this.phone;
    contact.email = this.email;
    contact.accountid = this.accountid;
    if(obj == 'save'){
      if(this.obj == "detail"){
        //if validate button was clicked and an existant recruiter was modified
        this.saveExistantContact(contact, this.recruiter);
      }else{
        //if validate button was clicked, and a new recruiter was entered
        this.saveNewContact(contact, this.recruiter);
      }
    }else{
      //if the send notification button was clicked
      var tel = contact.phone;
      //save existant contact
      if(this.recruiter){
        this.recruiterService.updateRecruiter(contact, this.currentUser.employer.id).then((data: any) => {
          let recruiterList = this.sharedService.getRecruiterList();
          this.recruiterService.updateRecruiterListInLocal(recruiterList, [contact]).then((data: any) => {
            this.sharedService.setRecruiterList(data);
            this.router.navigate(['recruiter/list']);
          });
          this.sendNotification(contact.accountid, tel);
        });
        return;
      }
      //save new contact
      if(!this.recruiter){
        if(contact && !this.recruiter){
          this.recruiterService.insertRecruiters([contact], this.currentUser.employer.id, 'manual').then((data: any) => {
            let recruiterList = this.sharedService.getRecruiterList();
            this.recruiterService.updateRecruiterListInLocal(recruiterList, data).then((data: any) => {
              this.sharedService.setRecruiterList(data);
              this.router.navigate(['recruiter/list']);
            });
            this.sendNotification(data[0].accountid, tel);
          });
          return;
        }
      }
    }
  }

  sendNotification(accountid, tel){
    this.recruiterService.generatePasswd(accountid).then((passwd) => {
      let msg = this.currentUser.titre + " " + this.currentUser.nom + " " + this.currentUser.prenom + " vous invite à télécharger et installer l'application Vit-On-Job Employeur. http://www.vitonjob.com/telecharger . Votre mot de passe est " + passwd;
      this.smsService.sendSms(tel, msg).then((data: any) => {
        if (!data || data.status != 200){
          this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
          return;
        }
      });
    });
  }

  saveNewContact(recruiter, contact){
    if(recruiter && !contact){
      this.recruiterService.insertRecruiters([recruiter], this.currentUser.employer.id, 'manual').then((data) => {
        let recruiterList = this.sharedService.getRecruiterList();
        this.recruiterService.updateRecruiterListInLocal(recruiterList, data).then((result: any) => {
          this.sharedService.setRecruiterList(result);
          this.router.navigate(['recruiter/list']);
        });
      });
      return;
    }
  }

  saveExistantContact(recruiter, contact){
    if(recruiter && contact){
      this.recruiterService.updateRecruiter(recruiter, this.currentUser.employer.id).then((data) => {
        let recruiterList = this.sharedService.getRecruiterList();
        this.recruiterService.updateRecruiterListInLocal(recruiterList, [recruiter]).then((data: any) => {
          this.sharedService.setRecruiterList(data);
          this.router.navigate(['recruiter/list']);
        });
      });
      return;
    }
  }


  /**
   * @description validate phone data field and call the function that search for it in the server
   */
  watchPhone(e) {
    if (this.phone) {
      this.isPhoneNumValid = false;
      if (e.target.value.substring(0, 1) == '0') {
        e.target.value = e.target.value.substring(1, e.target.value.length);
      }
      if (e.target.value.indexOf('.') != -1) {
        e.target.value = e.target.value.replace('.', '');
      }
      if (e.target.value.length > 9) {
        e.target.value = e.target.value.substring(0, 9);
      }
      if (e.target.value.length == 9) {
        this.doesPhoneExist(e.target.value);
        this.isPhoneNumValid = true;
      }
      this.phone = e.target.value;
    }
  }

  doesPhoneExist(phone){
    if (this.isPhoneValid(phone)) {
      var tel = "+" + this.index + phone;
      this.authService.getUserByPhone(tel, this.projectTarget).then((data: any) => {
        if (!data || data.status == "failure") {
          console.log(data);
          this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
          return;
        }
        if (!data || data.data.length == 0) {
          this.phoneExist = false;
        } else {
          this.phoneExist = true;
        }
      });
    }
  }

  isPhoneValid(tel) {
    if (this.phone) {
      var phone_REGEXP = /^0/;
      //check if the phone number start with a zero
      var isMatchRegex = phone_REGEXP.test(tel);
      if (Number(tel.length) == 9 && !isMatchRegex) {
        console.log('phone number is valid');
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

  isEmailExist(e) {
    //verify if the email exist in the database
    this.authService.getUserByMail(this.email, "employer").then((data: any) => {
      if (!data || data.status == "failure") {
        this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
        return;
      }
      if (data && data.data.length != 0) {
        this.emailExist = true;
      } else {
        this.emailExist = false;
      }
    });
  }

  /**
   * @description validate the email format
   */
  showEmailError() {
    if (this.email)
      return !(Utils.isEmailValid(this.email));
    else
      return false;
  }

  isUpdateDisabled(){
    return (!this.index || !this.phone || !this.isPhoneNumValid || this.phoneExist || (!this.firstname && !this.lastname) || !this.email || this.showEmailError() || this.emailExist);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  ngOnDestroy(): void {
    if(this.obj == "detail")
      this.sharedService.setCurrentRecruiter(null);
  }
}
