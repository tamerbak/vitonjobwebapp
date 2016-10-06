import {Component} from "@angular/core";
import {GlobalConfigs} from "../../configurations/globalConfigs";
import {SharedService} from "../../providers/shared.service";
import {FinanceService} from "../../providers/finance.service";
import {ContractService} from "../../providers/contract-service";
import {SmsService} from "../../providers/sms-service";
import {Helpers} from "../../providers/helpers.service";
import {Router} from "@angular/router";

/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./yousign.html'),
  styles: [require('./yousign.scss')],
  providers: [FinanceService, GlobalConfigs, ContractService, Helpers, SmsService]
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

  constructor(public gc: GlobalConfigs,
              private contractService: ContractService,
              private smsService: SmsService,
              private financeService: FinanceService,
              private sharedService: SharedService,
              private router: Router){
    this.currentUser = this.sharedService.getCurrentUser();
    // Get target to determine configs
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    // Set local variables and messages
    //get the currentEmployer & call youssign service
    this.isEmployer = (this.projectTarget == 'employer');
    this.jobyer = this.sharedService.getCurrentJobyer();
    this.contractData = this.sharedService.getContractData();
    this.currentOffer = this.sharedService.getCurrentOffer();

    let currentEmployer = this.currentUser.employer;
    if (currentEmployer) {
      this.employer = currentEmployer;
      this.callYousign();
    }
  }

  goToPaymentMethod(){
    this.router.navigate(['app/payment/method']);
  }

  /**
   * @author daoudi amine
   * @description call yousign service and send sms to the jobyer
   */
  callYousign(){
    this.hideLoader = false;
    this.financeService.loadQuote(
      this.currentOffer.idOffer,
      this.contractData.baseSalary
    ).then((data: any) =>{
      this.contractService.callYousign(
        this.currentUser,
        this.employer,
        this.jobyer,
        this.contractData,
        this.projectTarget,
        this.currentOffer,
        data.quoteId
      ).then((data: any) =>{
        if (data == null || data.length == 0) {
          console.log("Yousign result is null");
          this.hideLoader = true;
          return;
        }

        let dataValue = data[0]['value'];
        let yousignData = JSON.parse(dataValue);

        //change jobyer 'contacted' status
        this.jobyer.contacted = true;
        this.jobyer.date_invit = new Date();

        //get the link yousign of the contract for the employer
        let yousignEmployerLink = yousignData.iFrameURLs[1].iFrameURL;

        //Create to Iframe to show the contract in the NavPage
        let iframe = document.createElement('iframe');
        iframe.frameBorder = "0";
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.id = "youSign";
        iframe.style.overflow = "hidden";
        iframe.style.height = "100%";
        iframe.style.width = "100%";
        iframe.setAttribute("src", yousignEmployerLink);

        document.getElementById("iframPlaceHolder").appendChild(iframe);

        let yousignJobyerLink = yousignData.iFrameURLs[0].iFrameURL;
        let jobyerPhoneNumber = this.jobyer.tel;

        this.contractData.demandeJobyer = yousignData.idDemands[0].idDemand;
        this.contractData.demandeEmployer = yousignData.idDemands[1].idDemand;

        // TEL23082016 : Navigate to credit card page directly :
        //this.router.navigate(['app/wallet/create']);
        // Send sms to jobyer
        this.smsService.sendSms(jobyerPhoneNumber, 'Une demande de signature de contrat vous a été adressée. Contrat numéro : ' + this.contractData.numero);
        //save contract in Database
        this.contractService.getJobyerId(this.jobyer, this.projectTarget).then(
          (jobyerData: any) =>{
            this.contractService.saveContract(
              this.contractData,
              jobyerData.data[0].pk_user_jobyer,
              this.employer.entreprises[0].id,
              this.projectTarget,
              yousignJobyerLink,
              this.currentUser.id
            ).then(
              (data: any) =>{
                if (this.currentOffer && this.currentOffer != null) {
                  let idContract = 0;
                  if (data && data.data && data.data.length > 0)
                    idContract = data.data[0].pk_user_contrat;
                  let contract = {
                    pk_user_contrat: idContract
                  };
                  this.contractService.setOffer(idContract, this.currentOffer.idOffer);
                  this.contractService.generateMission(idContract, this.currentOffer);
                  this.hideLoader = true;
                }
              },
              (err) =>{
                console.log(err);
              })
          },
          (err) =>{
            console.log(err);
          })
      }).catch(function(err){
        console.log(err);
      });
    });
  }
}


