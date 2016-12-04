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
  contractId: number;

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

    let currentEmployer = this.currentUser.employer;
    if (currentEmployer) {
      this.employer = currentEmployer;
      this.callYousign();
    }
  }

  goToPaymentMethod() {
    this.router.navigate(['payment/method']);
  }

  /**
   * @author daoudi amine
   * @description call yousign service and send sms to the jobyer
   */
  callYousign() {
    this.hideLoader = false;
    this.financeService.loadQuote(
      this.currentOffer.idOffer,
      this.contractData.baseSalary
    ).then((data: any) => {
      if(!data || Utils.isEmpty(data.quoteId) || data.quoteId == 0){
        this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
        this.hideLoader = true;
        return;
      }

      this.financeService.loadPrevQuote(this.currentOffer.idOffer).then((results : any)=>{
        if(!results || !results.lignes || results.lignes.length == 0){
          this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
          this.hideLoader = true;
          return;
        }
        let lines = results.lignes;

        // HACK: I comment because the computing process has been simplified
        // let cfix = 0;
        // let cotis = 0;
        // for(let i = 0 ; i < lines.length ; i++){
        //   let l = lines[i];
        //   if(l.unite == 'IJ' || l.unite == 'IH' || l.unite == 'I')
        //     cfix += l.valeur;
        //   else if (l.unite == 'H' && l.nbUnite>0){
        //     cotis += l.valeur/l.nbUnite;
        //   }
        // }
        // this.contractData.elementsCotisation = cotis;
        // this.contractData.elementsNonCotisation = cfix;

        this.contractService.callYousign(
          this.currentUser,
          this.employer,
          this.jobyer,
          this.contractData,
          this.projectTarget,
          this.currentOffer,
          data.quoteId
        ).then((data: any) => {
          if(!data || data == null || Utils.isEmpty(data.Employeur) || Utils.isEmpty(data.Jobyer) || Utils.isEmpty(data.Employeur.idContrat) || Utils.isEmpty(data.Jobyer.idContrat) || !Utils.isValidUrl(data.Employeur.url) || !Utils.isValidUrl(data.Jobyer.url)){
            this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
            this.hideLoader = true;
            return;
          }
          let partner = GlobalConfigs.global['electronic-signature'];

          //change jobyer 'contacted' status
          this.jobyer.contacted = true;
          this.jobyer.date_invit = new Date();

          let dataValue = null;
          let partnerData = null;
          let partnerEmployerLink = null;

          if (partner === 'yousign') {
            dataValue = data[0]['value'];
            partnerData = JSON.parse(dataValue);
            //get the link yousign of the contract for the employer
            partnerEmployerLink = partnerData.iFrameURLs[1].iFrameURL;
          } else if (partner === 'docusign') {
            dataValue = data;
            partnerData = dataValue;
            //get the link docusign of the contract for the employer
            partnerEmployerLink = partnerData.Employeur.url;
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
          iframe.setAttribute("src", partnerEmployerLink);

          document.getElementById("iframPlaceHolder").appendChild(iframe);

          // get the partner link of the contract and the phoneNumber of the jobyer
          let partnerJobyerLink = null;

          if (partner === 'yousign') {
            partnerJobyerLink = partnerData.iFrameURLs[0].iFrameURL;
            this.contractData.demandeJobyer = partnerData.idDemands[0].idDemand;
            this.contractData.demandeEmployer = partnerData.idDemands[1].idDemand;

          } else if (partner === 'docusign') {
            partnerJobyerLink = partnerData.Jobyer.url;
            this.contractData.demandeJobyer = partnerData.Jobyer.idContrat;
            this.contractData.demandeEmployer = partnerData.Employeur.idContrat;
          }

          //save contract in Database
          this.contractService.getJobyerId(this.jobyer, this.projectTarget).then(
            (jobyerData: any) => {
              if(!jobyerData || jobyerData.status != "success"){
                this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                this.hideLoader = true;
                return;
              }
              this.contractService.saveContract(
                this.contractData,
                jobyerData.data[0].pk_user_jobyer,
                this.employer.entreprises[0].id,
                this.projectTarget,
                partnerJobyerLink,
                partnerEmployerLink,
                this.currentUser.id
              ).then(
                (data: any) => {
                  if (data && data.status == "success" && data.data && data.data.length > 0) {
                    if (this.currentOffer && this.currentOffer != null) {
                      let idContract = data.data[0].pk_user_contrat;
                      this.contractId = idContract;
                      this.contractService.setOffer(idContract, this.currentOffer.idOffer).then((res: any) => {
                        if(!res || res.status != "success"){
                          this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                          this.hideLoader = true;
                          return;
                        }else{
                          this.checkOfferState(this.currentOffer);
                        }
                      })
                      this.contractService.generateMission(idContract, this.currentOffer);
                      this.hideLoader = true;
                    }
                  }else {
                    this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                    this.hideLoader = true;
                    return;
                  }
                },
                (err) => {
                  this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                  this.hideLoader = true;
                  return;
                })
            },
            (err) => {
              this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
              this.hideLoader = true;
              return;
            })
        }).catch(function (err) {
          this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
          this.hideLoader = true;
          return;
        });
      });
    });
  }

  checkDocusignSignatureState() {
    if (!this.contractId ||this.contractId == 0) {
      this.addAlert("warning", "Veuillez signer le contrat avant de passer à l'étape suivante");
    } else {
      this.contractService.checkDocusignSignatureState(this.contractId).then((data: any) => {
        let state = data.data[0].etat;
        if (state.toLowerCase() == "oui") {
          // Send sms to jobyer
          this.smsService.sendSms(this.jobyer.tel, 'Une demande de signature de contrat vous a été adressée. Contrat numéro : ' + this.contractData.numero);
          this.goToPaymentMethod();
        } else {
          this.addAlert("warning", "Veuillez signer le contrat avant de passer à l'étape suivante");
        }
      });
    }
  }

  checkOfferState(offer){
    this.contractService.getContractsByOffer(offer.idOffer).then((data: any) => {
      if(data && data.data && data.data.length != 0 && data.data.length == offer.nbPoste){
        this.offerService.updateOfferState(offer.idOffer, "en archive");
        offer.etat = "en archive";
        this.offerService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
      }
    })
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}


