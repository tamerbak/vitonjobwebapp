import {Component, NgZone, ViewEncapsulation} from "@angular/core";
import {OffersService} from "../../providers/offer.service";
import {DomSanitizationService} from "@angular/platform-browser";
import {SharedService} from "../../providers/shared.service";
import {SearchService} from "../../providers/search-service";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {ModalOptions} from "../modal-options/modal-options";
import {ModalOfferTempQuote} from "../modal-offer-temp-quote/modal-offer-temp-quote";
import {FinanceService} from "../../providers/finance.service";
import {Configs} from "../../configurations/configs";
import {MapsAPILoader} from "angular2-google-maps/core";
import {AddressUtils} from "../utils/addressUtils";
import {LoadListService} from "../../providers/load-list.service";
import {Utils} from "../utils/utils";
import {DateUtils} from "../utils/date-utils";
import {ConventionService} from "../../providers/convention.service";
import {CandidatureService} from "../../providers/candidature-service";
import {SmsService} from "../../providers/sms-service";
import {AdvertService} from "../../providers/advert.service";
import {MissionService} from "../../providers/mission-service";
// import {ConventionParameters} from "./convention-parameters/convention-parameters";
import {Offer} from "../../dto/offer";
import {Job} from "../../dto/job";
import {SelectLanguages} from "../components/select-languages/select-languages";
import {SelectList} from "../components/select-list/select-list";
import {Calendar} from "../components/calendar/calendar";

declare let Messenger, jQuery: any;
declare let google: any;
declare let moment: any;
declare let require;

/**
 * This page is use to welcome new user from partner
 */
@Component({
  template: require('./origine.html'),
  providers: [SharedService]
})
export class Origine {

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngAfterViewInit() {
    if (!this.sharedService.getCurrentUser()) {
      if (this.router && this.router.url && this.router.url.substr(0, '/origine/'.length) == '/origine/') {
        this.sharedService.setPartner(
          this.router.url.substr('/origine/'.length, this.router.url.length)
        );
      }
    }
    this.router.navigate(['home']);
  }
}
