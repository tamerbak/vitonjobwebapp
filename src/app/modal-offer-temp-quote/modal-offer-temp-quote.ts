import {Component, NgZone,Input} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {OffersService} from "../../providers/offer.service";
import { FinanceService } from '../../providers/finance.service'



declare var jQuery, require, Messenger: any;

@Component({
  selector: '[modal-offer-temp-quote]',
  directives: [ROUTER_DIRECTIVES],
  providers: [OffersService,FinanceService],
  template: require('./modal-offer-temp-quote.html'),
  styles: [require('./modal-offer-temp-quote.scss')]
})
export class ModalOfferTempQuote {


  currentUser:any = null;
  projectTarget:any;
  processing:boolean = false;
  quote:any;


  constructor(private sharedService: SharedService,
              private offersService:OffersService,
              private financeService:FinanceService,
              private zone: NgZone,
              private router: Router) {
                this.currentUser = this.sharedService.getCurrentUser();
                if (!this.currentUser) {
                  this.router.navigate(['app/home']);
                } else {
                  this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
                  let offer = this.sharedService.getCurrentOffer().idOffer;
                  this.financeService.loadPrevQuote(offer.idOffer).then(data=>{
                    this.quote = data;
                  });
                  this.initQuote();
                }
  }

  initQuote(){
        this.quote = {
            "amountBeforeTaxes": 0.0,
            "class": "com.vitonjob.callouts.finance.Quote",
            "dateDevis": 0,
            "hours": [],
            "numero": "",
            "taxeRate": 0.0,
            "taxes": 0.0,
            "total": 0.0
        }
    }

    formatHour(minutes){
        let h = Math.floor(minutes/60);
        let m = minutes%60;
        let sh = h<10?'0'+h:''+h;
        let sm = m<10?'0'+m:''+m;
        return sh+':'+sm;
    }

    formatPercent(rate){
        return (rate*100)+' %';
    }

}
