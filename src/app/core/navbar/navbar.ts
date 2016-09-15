import {Component, EventEmitter, OnInit, ElementRef} from '@angular/core';
import {TOOLTIP_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {ConfigService} from '../config';
import {Notifications} from '../notifications/notifications';
import {SharedService} from "../../providers/shared.service";
import {OffersService} from "../../providers/offer.service";
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  events: ['toggleSidebarEvent', 'toggleChatEvent'],
  directives: [Notifications, TOOLTIP_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [OffersService],
  template: require('./navbar.html')
})
export class Navbar implements OnInit {
  toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  currentUser:any = {nom:"",prenom:""};
  isEmployer:boolean;
  projectTarget:string;
  alerts:any= [
    {text:'13 Offres correspondent au poste "Serveur"' ,info:"  ",image:"assets/images/people/a8.jpg"},
    {text:'Notification' ,info:"  ",image:"assets/images/people/a9.jpg"},
    {text:'Notification' ,info: "  ",image:"assets/images/people/a8.jpg"}
  ]

  autoSearchOffers:any = []


  constructor(el: ElementRef, config: ConfigService,private sharedService:SharedService,private offerService: OffersService) {
    //TODO: change this line & redirect to login page if not connected
    this.currentUser = this.sharedService.getCurrentUser()? this.sharedService.getCurrentUser():  {nom:"",prenom:"",estEmployeur:false,jobyer:{offers:[]}};
    this.isEmployer = this.currentUser.estEmployeur;
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');

    console.log(this.currentUser);
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
  }

  getOffers(){
		var offers = this.isEmployer ? this.currentUser.employer.entreprises[0].offers : this.currentUser.jobyer.offers;
		for(var i = 0; i < offers.length; i++){
			var offer = offers[i];
			if(offer.visible && offer.rechercheAutomatique){
				offer.arrowLabel = "arrow-dropright";
				offer.isResultHidden = true;
        offer.correspondantsCount = -1;
				this.autoSearchOffers.push(offer);
				continue;
			}
		}
		for(var i = 0; i < this.autoSearchOffers.length; i++){
			let offer = this.autoSearchOffers[i];
			this.offerService.getCorrespondingOffers(offer, this.projectTarget).then((data:any) => {
				offer.correspondantsCount = data.length;
        offer.image = "assets/images/people/a8.jpg"
			});
		}
	}

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }

  ngOnInit(): void {
    this.getOffers();
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

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')[e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }
}
