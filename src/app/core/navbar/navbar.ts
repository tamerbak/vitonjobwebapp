import {Component, EventEmitter, OnInit, ElementRef} from "@angular/core";
import {TOOLTIP_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ConfigService} from "../config";
import {Notifications} from "../notifications/notifications";
import {SharedService} from "../../../providers/shared.service";
import {OffersService} from "../../../providers/offer.service";
import {NotificationsService} from "../../../providers/notifications.service";
import {EntrepriseSelector} from "../entreprise-selector/entreprise-selector";
import {Configs} from "../../../configurations/configs";

declare let jQuery: any;

@Component({
  selector: '[navbar]',
  events: ['toggleSidebarEvent', 'toggleAppEvent'],
  directives: [Notifications, EntrepriseSelector, TOOLTIP_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [OffersService],
  template: require('./navbar.html'),
  styles: [require('./navbar.scss')],

})
export class Navbar implements OnInit {
  toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  toggleAppEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  screenSize: string;
  currentUser: any;
  isEmployer: boolean;
  projectTarget: string;

  allSearchOffers: any = [];
  autoSearchOffers: any = [];
  offersNotifications: any =[];
  public loadOffers: Function;
  notifCount: number = 0;

  //offers of interested jobyers
  interestedJobyersNotif: any =[];

  setImgClasses() {
    return {
      'img-circle': true,//TODO:this.currentUser && this.currentUser.estEmployeur,
    };
  }

  constructor(el: ElementRef, config: ConfigService, private sharedService: SharedService, private offerService: OffersService,private notificationsService:NotificationsService, private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.isEmployer = this.currentUser.estEmployeur;
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
      notificationsService.offersUpdated.subscribe(obj => this.UpdateOffers(obj));
      this.getOffers();
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
    if (Configs.isOnline === false) {
      this.screenSize = config.getScreenSize();
    }
  }

  UpdateOffers(obj) {
    this.offersNotifications = this.notificationsService.autoSearchOffers;
    this.notifCount = this.offersNotifications.length;
    //notifications for the interested jobyers
    if(!this.currentUser || !this.currentUser.employer){
      return;
    }
    this.loadInterestedJobyersOffers().then((data: any) => {
      this.notifCount = this.notifCount + this.interestedJobyersNotif.length;
    });
  }

  refreshOffers(evt) {
    evt.stopPropagation();
    this.getOffers();
    return false;
  }

  getOffers() {
    this.allSearchOffers = [];
    this.autoSearchOffers = [];
    var offers = this.isEmployer ? this.sharedService.getCurrentUser().employer.entreprises[0].offers : this.sharedService.getCurrentUser().jobyer.offers;
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
          this.notificationsService.add(offer);
        }
      });
    }

  }

  logOut() {
    this.currentUser = null;
    this.sharedService.logOut();
    this.router.navigate(['home']);
  }

  gotoProfile() {
    if (this.sharedService.getCurrentUser().estEmployeur == false) {
      this.router.navigate(['profile']);
    }
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleAppEvent.emit(null);
  }

  ngOnInit(): void {
    this.loadOffers = this.getOffers.bind(this);
    this.loadOffers = this.refreshOffers.bind(this);

    setTimeout(() => {
      let $chatNotification = jQuery('#chat-notification');
      $chatNotification.removeClass('hide').addClass('animated fadeIn')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                $chatNotification.addClass('hide');
              });
          }, 4000);
        });
      $chatNotification.siblings('#toggle-chat').append('<i class="chat-notification-sing animated bounceIn"></i>');
    }, 4000);

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
    this.router.navigate(['home']);
  }

  loadInterestedJobyersOffers(){
    return new Promise(resolve => {
      this.offerService.countInterestedJobyersByOffer(this.currentUser.employer.entreprises[0].id).then((data: any) => {
        if(data && data.status == "success" && data.data){
          this.interestedJobyersNotif = data.data;
          resolve(this.interestedJobyersNotif);
        }
      });
    });
  }
}
