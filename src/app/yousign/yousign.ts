import {Component} from '@angular/core';
import {GlobalConfigs} from "../configurations/globalConfigs";
import {SharedService} from "../../providers/shared.service";
import {FinanceService} from "../../providers/finance.service";
import {ContractService} from "../../providers/contract-service";
import {Helpers} from "../../providers/helpers.service";

/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./yousign.html'),
  styles: [require('./yousign.scss')],

  // templateUrl: 'build/pages/yousign/yousign.html',
  providers: [FinanceService, GlobalConfigs, ContractService, Helpers]
  // providers : [PushNotificationService, FinanceService]
})
export class Yousign {

  projectTarget: string;
  isEmployer: boolean;

  employer: any;
  currentUser: any;
  jobyer: any;
  dataObject: any;
  contractData: any;

  currentOffer: any = null;
  // pushNotificationService:PushNotificationService;

  constructor(public gc: GlobalConfigs,
              // public nav: NavController,
              // private navParams:NavParams,
              private contractService: ContractService,
              // private userService:UserService,
              // private smsService:SmsService,
              private financeService: FinanceService,
              // pushNotificationService : PushNotificationService,
              private sharedService: SharedService) {

    this.currentUser = this.sharedService.getCurrentUser();

    // Get target to determine configs
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');

    // Set local variables and messages
    //get the currentEmployer & call youssign service
    // this.pushNotificationService = pushNotificationService;


    this.isEmployer = (this.projectTarget == 'employer');
    this.jobyer = this.sharedService.getCurrentJobyer();
    this.contractData = this.sharedService.getContractData();
    this.currentOffer = this.sharedService.getCurrentOffer();


    // TODO : A voir
    // userService.getCurrentUser(this.projectTarget).then(results =>{
    //     this.currentUser = JSON.parse(results);
    let currentEmployer = this.currentUser.employer;

    if (currentEmployer) {
      this.employer = currentEmployer;
      this.callYousign();
    }
    //     console.log(currentEmployer);
    // });
  }

  goToPayment() {
    // TODO
    //   this.nav.push(WalletCreatePage);
  }

  goToMissionsList() {
    // TODO
    //   this.nav.push(MissionListPage);
  }

  /**
   * @author daoudi amine
   * @description call yousign service and send sms to the jobyer
   */
  callYousign() {
    // let loading = Loading.create({
    //     content: `
    //         <div>
    //             <img src='img/loading.gif' />
    //         </div>
    //         `,
    //     spinner : 'hide'
    // });
    // this.nav.present(loading);

    // TODO
    console.log({'this.currentOffer: ': this.currentOffer});

    this.financeService.loadQuote(
      this.currentOffer.idOffer,
      this.contractData.baseSalary
    ).then((data: any) => {
      this.contractService.callYousign(
        this.currentUser,
        this.employer,
        this.jobyer,
        this.contractData,
        this.projectTarget,
        this.currentOffer,
        data.quoteId
      ).then((data: any) => {
        // loading.dismiss();
        //// debugger;
        console.log(JSON.stringify(this.employer));
        if (data == null || data.length == 0) {
          console.log("Yousign result is null");
          return;
        }

        let dataValue = data[0]['value'];
        let yousignData = JSON.parse(dataValue);
        console.log(yousignData);

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
        console.log('yousignEmployerLink: ' + yousignEmployerLink);

        document.getElementById("iframPlaceHolder").appendChild(iframe);

        // TEL:23082016 : Using inappbrowser plugin :
        // InAppBrowser.open(yousignEmployerLink, '_blank');
        //browser.show();
        // get the yousign link of the contract and the phoneNumber of the jobyer
        let yousignJobyerLink = yousignData.iFrameURLs[0].iFrameURL;
        let jobyerPhoneNumber = this.jobyer.tel;

        this.contractData.demandeJobyer = yousignData.idDemands[0].idDemand;
        this.contractData.demandeEmployer = yousignData.idDemands[1].idDemand;

        // TODO
        // // TEL23082016 : Navigate to credit card page directly :
        // this.nav.push(WalletCreatePage);
        //
        // // Send sms to jobyer
        // //// debugger;
        // this.smsService.sendSms(jobyerPhoneNumber, 'Une demande de signature de contrat vous a été adressée. Contrat numéro : '+this.contractData.numero).then((dataSms) => {
        //     //// debugger;
        //     console.log("The message was sent successfully");
        // }).catch(function(err) {
        //     //// debugger;
        //     console.log(err);
        // });
        // // send notification to jobyer
        // console.log('jobyer id : '+this.jobyer.id);

        //save contract in Database
        this.contractService.getJobyerId(this.jobyer, this.projectTarget).then(
          (jobyerData: any) => {
            this.contractService.saveContract(
              this.contractData,
              jobyerData.data[0].pk_user_jobyer,
              this.employer.entreprises[0].id,
              this.projectTarget,
              yousignJobyerLink,
              this.currentUser.id
            ).then(
              (data: any) => {
                if (this.currentOffer && this.currentOffer != null) {
                  let idContract = 0;
                  if (data && data.data && data.data.length > 0)
                    idContract = data.data[0].pk_user_contrat;
                  let contract = {
                    pk_user_contrat: idContract
                  };
                  this.contractService.setOffer(idContract, this.currentOffer.idOffer);
                  // TODO : Notification after contract signature
                  // this.pushNotificationService.getToken(this.jobyer.id, "toJobyer").then(token => {
                  //     if(token.data && token.data.length>0){
                  //         let tk = token;
                  //         var message = "Une demande de signature de contrat vous a été adressée";
                  //         console.log('message notification : '+message);
                  //         console.log('token : '+tk);
                  //         this.pushNotificationService.sendPushNotification(tk, message, contract, "MissionDetailsPage").then(data => {
                  //             console.log('Notification sent : '+JSON.stringify(data));
                  //         });
                  //     }
                  //
                  // });
                  this.contractService.generateMission(idContract, this.currentOffer);
                }
              },
              (err) => {
                console.log(err);
              })
          },
          (err) => {
            console.log(err);
          })
      }).catch(function (err) {
        console.log(err);
      });
    });

  }
}


