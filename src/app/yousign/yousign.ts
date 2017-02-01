import {Component} from "@angular/core";
import {GlobalConfigs} from "../../configurations/globalConfigs";
import {SharedService} from "../../providers/shared.service";
import {FinanceService} from "../../providers/finance.service";
import {ContractService} from "../../providers/contract-service";
import {SmsService} from "../../providers/sms-service";
import {Helpers} from "../../providers/helpers.service";
import {Router} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {MissionService} from "../../providers/mission-service";
import {Utils} from "../utils/utils";
import {OffersService} from "../../providers/offer.service";


/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./yousign.html'),
  styles: [require('./yousign.scss')],
  directives: [AlertComponent],
  providers: [FinanceService, GlobalConfigs, ContractService, Helpers, SmsService, MissionService, OffersService]
})
export class Yousign{

  projectTarget: string;
  isEmployer: boolean;

  employer: any;
  currentUser: any;
  jobyer: any;
  dataObject: any;
  contractData: any;

  currentOffer: any = null;
  hideLoader = false;

  alerts: Array<Object>;

  constructor(public gc: GlobalConfigs,
              private contractService: ContractService,
              private offerService: OffersService,
              private smsService: SmsService,
              private financeService: FinanceService,
              private sharedService: SharedService,
              private missionService: MissionService,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    // Get target to determine configs
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    // Set local variables and messages
    //get the currentEmployer & call youssign service
    this.isEmployer = (this.projectTarget == 'employer');
    this.jobyer = this.sharedService.getCurrentJobyer();
    this.contractData = this.sharedService.getContractData();
    this.currentOffer = this.sharedService.getCurrentOffer();
  }

  ngOnInit(){
    let currentEmployer = this.currentUser.employer;
    if (currentEmployer) {
      this.employer = currentEmployer;
      this.setDocusignFrame();
    }
  }

  goToPaymentMethod() {
    this.router.navigate(['payment/method']);
  }

  /**
   * @author daoudi amine
   * @description call yousign service and send sms to the jobyer
   */
  checkDocusignSignatureState() {
    if (!this.contractData.id ||this.contractData.id == 0) {
      this.addAlert("warning", "Veuillez signer le contrat avant de passer à l'étape suivante");
    } else {
      this.contractService.checkDocusignSignatureState(this.contractData.id).then((data: any) => {
        let state = data.data[0].etat;
        if (state.toLowerCase() == "oui") {
          // Send sms to jobyer
          this.smsService.sendSms(this.jobyer.tel, 'Une demande de signature de contrat vous a été adressée. Contrat numéro : ' + this.contractData.num);
          this.goToPaymentMethod();
        } else {
          this.addAlert("warning", "Veuillez signer le contrat avant de passer à l'étape suivante");
        }
      });
    }
  }

  setDocusignFrame(){
    //change jobyer 'contacted' status
    this.jobyer.contacted = true;
    this.jobyer.date_invit = new Date();

    //Create to Iframe to show the contract in the NavPage
    let iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.id = "youSign";
    iframe.style.overflow = "hidden";
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.setAttribute("src", this.contractData.partnerEmployerLink);

    document.getElementById("iframPlaceHolder").appendChild(iframe);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}


