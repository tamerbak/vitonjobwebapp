import {Component} from "@angular/core";
import {GlobalConfigs} from "../../configurations/globalConfigs";
import {SharedService} from "../../providers/shared.service";
import {FinanceService} from "../../providers/finance.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";


/**
 * This module manage the hours record signature from the employer
 */
@Component({
  selector: '[mission-end-releve]',
  template: require('./mission-end-releve.html'),
  styles: [require('./mission-end-releve.scss')],
  providers: [GlobalConfigs, FinanceService],
  directives: [ROUTER_DIRECTIVES]
})
export class MissionEndReleve {
  currentUser: any;
  invoice: any;
  isEmployer: boolean;
  idInvoice: number;
  unSigned: boolean = false;

  constructor(private sharedService: SharedService,
              private financeService: FinanceService,
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

    this.financeService.loadInvoiceSignature(this.idInvoice).then((data: any) => {

      this.invoice = data;

      if (this.isEmployer) {
        this.unSigned = (this.invoice.releve_signe_employeur == "Non");
        if (this.unSigned)
          this.initEmployerYousign();
      } else {
        this.unSigned = (this.invoice.releve_signe_jobyer == "Non");
        if (this.unSigned)
          this.initJobyerYousign();
      }
    });
  }

  initEmployerYousign() {
    //get the link yousign of the contract for the employer
    let yousignEmployerLink = this.invoice.url_signature_de_releve_employeur;

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

  gotoInvoice(){
    this.router.navigate(['mission/details']);
  }
}

