import {Component} from '@angular/core';
import {GlobalConfigs} from "../configurations/globalConfigs";
import {SharedService} from "../providers/shared.service";
import {FinanceService} from "../providers/finance.service";

/**
 * This module manage the invoice signature from the employer
 */
@Component({
  selector: '[mission-end-invoice]',
  template: require('./mission-end-invoice.html'),
  styles: [require('./mission-end-invoice.scss')],
  providers: [SharedService, GlobalConfigs, FinanceService]
})
export class MissionEndInvoice {
  invoice: any;
  idInvoice: number;
  unSigned: boolean = false;

  constructor(private sharedService: SharedService,
              private service: FinanceService) {

    this.idInvoice = this.sharedService.getCurrentInvoice();
    this.invoice = {
      url_signature_de_facture: '',
      demande_de_signature_de_facture: ''
    };

    this.service.loadInvoiceSignature(this.idInvoice).then((data: any) => {
      this.invoice = data;
      this.unSigned = (this.invoice.facture_signee == "Non");
      if (this.unSigned)
        this.initYousign();
    });
  }

  initYousign() {
    //get the link yousign of the contract for the employer
    let yousignEmployerLink = this.invoice.url_signature_de_facture;

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

  getBackToMissions() {
    // this.nav.pop();
  }
}
