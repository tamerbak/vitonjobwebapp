import {Component, Input, ElementRef, OnInit} from "@angular/core";
import {ConfigService} from "../config";
import {SharedService} from "../../../providers/shared.service";
import {SearchService} from "../../../providers/search-service";
import {Router} from "@angular/router";
import {NotificationLoad} from "./notification-load";
declare var jQuery, require,window: any;

@Component({
  selector: 'notifications',
  directives: [NotificationLoad],
  providers:[SearchService],
  template: require('./notifications.html')
})
export class Notifications implements OnInit {
  $el: any;
  config: any;
  projectTarget:any;
  @Input() alerts: any;
  @Input() loadOffers: Function;

  constructor(el: ElementRef, config: ConfigService, private sharedService: SharedService,private searchService:SearchService,private router: Router) {
    if(this.sharedService.getCurrentUser()){
      this.projectTarget = this.sharedService.getProjectTarget();
    }
    this.$el = jQuery(el.nativeElement);
    this.config = config;
  }

  goToDetailOffer(offer) {
    this.sharedService.setCurrentOffer(offer);
    this.router.navigate(['app/offer/detail']);
    window.location.reload();
  }

  launchSearch(offer, noRedirect) {
      if (!offer){
          return;
      }

      let searchFields = {
          class : 'com.vitonjob.callouts.recherche.SearchQuery',
          job : offer.jobData.job,
          metier : '',
          lieu : '',
          nom : '',
          entreprise : '',
          date : '',
          table : this.projectTarget == 'jobyer'?'user_offre_entreprise':'user_offre_jobyer',
          idOffre :'0'
      };
      this.searchService.criteriaSearch(searchFields, this.projectTarget).then(data => {
          this.sharedService.setLastResult(data);
          if(!noRedirect){
            if(this.router.url === '/app/search/results'){
              window.location.reload()
            }else{
              this.router.navigate(['app/search/results']);
            }
          }
      });
  }

  moveNotificationsDropdown(): void {
    jQuery('.sidebar-status .dropdown-toggle').after(jQuery('[notifications]').detach());
  }

  moveBackNotificationsDropdown(): void {
    jQuery('#notifications-dropdown-toggle').after(jQuery('[notifications]').detach());
  }

  ngOnInit(): void {
    this.config.onScreenSize(['sm', 'xs'], this.moveNotificationsDropdown);
    this.config.onScreenSize(['sm', 'xs'], this.moveBackNotificationsDropdown, false);

    if (this.config.isScreen('sm')) {
      this.moveNotificationsDropdown();
    }
    if (this.config.isScreen('xs')) {
      this.moveNotificationsDropdown();
    }

    jQuery('.sidebar-status').on('show.bs.dropdown', () => {
      jQuery('#sidebar').css('z-index', 2);
    }).on('hidden.bs.dropdown', () => {
      jQuery('#sidebar').css('z-index', '');
    });

    jQuery(document).on('change', '[data-toggle="buttons"] > label', ($event) => {
      let $input = jQuery($event.target).find('input');
      $input.trigger('change');
    });
  }
}
