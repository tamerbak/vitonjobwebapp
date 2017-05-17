import {Component} from "@angular/core";
import {GlobalConfigs} from "../../configurations/globalConfigs";
import {SharedService} from "../../providers/shared.service";
import {FinanceService} from "../../providers/finance.service";
import {Router} from "@angular/router";
import {Utils} from "../utils/utils";
import {AlertComponent} from "ng2-bootstrap";
import {MissionService} from "../../providers/mission-service";
import {Configs} from "../../configurations/configs";
declare let Messenger: any;

/**
 * This module manage the hours record signature from the employer
 */
@Component({
  selector: '[mission-end-releve]',
  template: require('./mission-end-releve.html'),
  styles: [require('./mission-end-releve.scss')],
  providers: [GlobalConfigs, FinanceService, MissionService],
  directives: [AlertComponent]
})
export class MissionEndReleve {
  currentUser: any;
  invoice: any;
  isEmployer: boolean;
  idInvoice: number;
  alerts: Array<Object>;
  inProgress: boolean;
  isReleveCorrupted: boolean;

  constructor(private sharedService: SharedService,
              private financeService: FinanceService,
              private missionService: MissionService,
              private router: Router) {

    this.idInvoice = this.sharedService.getCurrentInvoice();

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    }
    this.isEmployer = this.currentUser.estEmployeur;

    this.invoice = {
      url_signature_de_releve_employeur: '',
      url_signature_de_releve_jobyer: ''
    };

    this.loadInvoiceSignature();
  }

  loadInvoiceSignature(){
    this.financeService.loadInvoiceSignature(this.idInvoice).then((data: any) => {

      this.invoice = data;

      if (this.isEmployer) {
        let unSigned = (this.invoice.releve_signe_employeur.toUpperCase() == "NON");
        if (unSigned)
          this.initEmployerYousign();
      } else {
        let unSigned = (this.invoice.releve_signe_jobyer.toUpperCase() == "NON");
        if (unSigned)
          this.initJobyerYousign();
      }
    });
  }

  initEmployerYousign() {
    //get the link yousign of the contract for the employer
    let yousignEmployerLink = this.invoice.url_signature_de_releve_employeur;
    this.isReleveCorrupted = (this.isEmpty(yousignEmployerLink));

    if(this.isReleveCorrupted){
      this.addAlert("danger", "Une erreur est survenue lors de la génération du relevé d'heures. Veuillez le regénérer.");
      return;
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
    iframe.setAttribute("src", yousignEmployerLink);

    console.log('load iframe from: ' + yousignEmployerLink);

    document.getElementById("iframPlaceHolder").appendChild(iframe);
  }

  initJobyerYousign() {
    //get the link yousign of the contract for the employer
    let yousignEmployerLink = this.invoice.url_signature_de_releve_jobyer;

    if(Utils.isEmpty(yousignEmployerLink)){
      this.addAlert("danger", "Une erreur est survenue lors de la génération du relevé. Veuillez réessayer.");
      return;
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
    iframe.setAttribute("src", yousignEmployerLink);

    console.log('load iframe from: ' + yousignEmployerLink);

    document.getElementById("iframPlaceHolder").appendChild(iframe);
  }

  regenerateReleve(){
    this.inProgress = true;
    this.alerts = [];
    this.addAlert("info", "Le relevé est en cours de génération. Veuillez patienter ...");

    this.financeService.deleteMissionInvoice(this.invoice.fk_user_contrat).then((data: any) => {
      this.missionService.endOfMission(this.invoice.fk_user_contrat).then((data: any) => {
        let idContrat = data.id;
        let idOffre = data.offerId;
        let rate = data.rate;

        this.financeService.loadInvoice(idContrat, idOffre, rate).then((invoiceData: any) => {

          let partner = GlobalConfigs.global['electronic-signature'];
          let idInvoice = invoiceData.invoiceId;

          let bean = {
            'class': (partner === 'yousign' ? 'com.vitonjob.yousign.callouts.YousignConfig' :
                (partner === 'docusign' ? 'com.vitonjob.docusign.model.DSConfig' :
                  '')
            ),
            employerFirstName : data.employerFirstName,
            employerLastName : data.employerLastName,
            employerEmail : data.employerEmail,
            employerPhone : data.employerPhone,
            jobyerFirstName : data.jobyerFirstName,
            jobyerLastName : data.jobyerLastName,
            jobyerEmail : data.jobyerEmail,
            jobyerPhone : data.jobyerPhone,
            idContract : idContrat,
            idInvoice : idInvoice,
            idDocument : idInvoice,
            environnement:Configs.env
          };
          this.missionService.signEndOfMission(bean).then(signatureData=>{
            this.financeService.checkInvoice(this.invoice.fk_user_contrat).then((invoice: any)=>{
              if(invoice){
                this.idInvoice = invoice.pk_user_facture_voj;
              }

              this.invoice = invoice;
              this.inProgress = false;
              this.alerts = [];
              Messenger().post({
                message: "Le relevé d'heures est généré avec succès. Il est en cours d'affichage. Veuillez patienter ...",
                type: 'success',
                showCloseButton: true,
                hideAfter: 10
              });
              this.loadInvoiceSignature();
            });
          });
        });
      });
    });
  }

  gotoMissionList(){
    this.router.navigate(['mission/list']);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  isEmpty(str){
    return Utils.isEmpty(str);
  }
}