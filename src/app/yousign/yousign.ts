import {Component} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ContractService} from "../../providers/contract-service";
import {SmsService} from "../../providers/sms-service";
import {Router} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";


/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./yousign.html'),
  styles: [require('./yousign.scss')],
  directives: [AlertComponent],
  providers: [ContractService, SmsService]
})
export class Yousign{

  projectTarget: string;
  isEmployer: boolean;

  employer: any;
  currentUser: any;
  jobyer: any;
  contractData: any;

  currentOffer: any = null;
  hideLoader = false;

  alerts: Array<Object>;

  constructor(private contractService: ContractService,
              private smsService: SmsService,
              private sharedService: SharedService,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();

    //les recruteurs n'ont pas le droit de signer des contrats
    if(this.currentUser.estRecruteur){
      this.router.navigate(['home']);
      return;
    }

    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    // Set local variables and messages
    //get the currentEmployer & call youssign service
    this.isEmployer = (this.projectTarget == 'employer');

    if(this.isEmployer){
      this.jobyer = this.sharedService.getCurrentJobyer();
      this.currentOffer = this.sharedService.getCurrentOffer();
    }

    this.contractData = this.sharedService.getContractData();
  }

  ngOnInit(){
    this.setDocusignFrame();
  }

  goToPaymentMethod() {
    if(this.isEmployer) {
      this.router.navigate(['payment/method']);
    }
  }

  checkDocusignSignatureState() {
    if (!this.contractData.id ||this.contractData.id == 0) {
      this.addAlert("warning", "Veuillez signer le contrat avant de passer à l'étape suivante");
    } else {
      this.contractService.checkDocusignSignatureState(this.contractData.id, this.projectTarget).then((data: any) => {
        let state = data.data[0].etat;
        if (state.toLowerCase() == "oui") {
          if(this.isEmployer) {
            // Send sms to jobyer
            this.smsService.sendSms(this.jobyer.tel, 'Une demande de signature de contrat vous a été adressée. Contrat numéro : ' + this.contractData.num);
            //this.goToPaymentMethod();
          }
          this.router.navigate(['mission/list']);
        } else {
          this.addAlert("warning", "Veuillez signer le contrat avant de passer à l'étape suivante");
        }
      });
    }
  }

  setDocusignFrame(){
    if(this.isEmployer) {
      //change jobyer 'contacted' status
      this.jobyer.contacted = true;
      this.jobyer.date_invit = new Date();
    }

    //Create to Iframe to show the contract in the NavPage
    let iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.id = "youSign";
    iframe.style.overflow = "hidden";
    iframe.style.height = "100%";
    iframe.style.width = "100%";

    if(this.isEmployer){
      iframe.setAttribute("src", this.contractData.partnerEmployerLink);
    }else{
      iframe.setAttribute("src", this.contractData.partnerJobyerLink);
    }

    document.getElementById("iframPlaceHolder").appendChild(iframe);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}


