import {Component, EventEmitter, OnInit, ElementRef} from "@angular/core";
import {TOOLTIP_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ConfigService} from "../config";
import {Notifications} from "../notifications/notifications";
import {SharedService} from "../../../providers/shared.service";
import {OffersService} from "../../../providers/offer.service";
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  events: ['toggleSidebarEvent', 'toggleChatEvent'],
  directives: [Notifications, TOOLTIP_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [OffersService],
  template: require('./navbar.html'),
  styles: [require('./navbar.scss')],

})
export class Navbar implements OnInit {
  toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  currentUser: any = {nom: "", prenom: ""};
  isEmployer: boolean;
  projectTarget: string;

  allSearchOffers: any = []
  autoSearchOffers: any = []
  public loadOffers: Function;


  constructor(el: ElementRef, config: ConfigService, private sharedService: SharedService, private offerService: OffersService, private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.isEmployer = this.currentUser.estEmployeur;
      this.getOffers();
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    } else {
      let role = this.sharedService.getProjectTarget();
      this.isEmployer = (role == "employer");
      if (this.isEmployer) {
        this.sharedService.setProjectTarget("employer");
      } else {
        this.sharedService.setProjectTarget("jobyer");
      }

    }

    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
  }

  refreshOffers(evt) {
    evt.stopPropagation();
    this.getOffers();
    return false;
  }

  getOffers() {
    this.allSearchOffers = [];
    this.autoSearchOffers = [];
    var offers = this.isEmployer ? this.currentUser.employer.entreprises[0].offers : this.currentUser.jobyer.offers;
    for (var i = 0; i < offers.length; i++) {
      var offer = offers[i];
      if (offer.visible && offer.rechercheAutomatique) {
        offer.arrowLabel = "arrow-dropright";
        offer.isResultHidden = true;
        offer.correspondantsCount = -1;
        this.allSearchOffers.push(offer);
        continue;
      }
    }
    for (var i = 0; i < this.allSearchOffers.length; i++) {
      let offer = this.allSearchOffers[i];
      this.offerService.getCorrespondingOffers(offer, this.projectTarget).then((data: any) => {
        offer.correspondantsCount = data.length;
        if (offer.correspondantsCount > 0) {
          offer.text = offer.correspondantsCount != 1 ? " Offres correspondent au poste de " : " Offre correspond au poste de ";
          this.autoSearchOffers.push(offer);
        }

      });
    }

  }

  logOut() {
    this.currentUser = null;
    this.sharedService.logOut();
    this.router.navigate(['app/dashboard']);
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  ngOnInit(): void {
    this.loadOffers = this.getOffers.bind(this);
    this.loadOffers = this.refreshOffers.bind(this);

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function (e): void {
      jQuery(this).parents('.input-group')[e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }

  switchProjectTarget() {
    let role = this.sharedService.getProjectTarget();
    this.isEmployer = (role == "employer");
    if (this.isEmployer) {
      this.sharedService.setProjectTarget("jobyer");
    } else {
      this.sharedService.setProjectTarget("employer");
    }
    this.router.navigate(['app/dashboard']);
  }
}
