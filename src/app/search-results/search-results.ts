import {Component, ViewEncapsulation} from '@angular/core';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {OffersService} from "../providers/offer.service";
import {SharedService} from "../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {SearchService} from "../providers/search-service";
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ProfileService} from "../providers/profile.service";

@Component({
  selector: '[search-results]',
  template: require('./search-results.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./search-results.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent, BUTTON_DIRECTIVES],
  providers: [OffersService, SearchService, ProfileService]
})
export class SearchResults {
	searchResults:any;

		
	globalOfferList = [];
	offerList = [];
	
	currentUser: any;
    projectTarget: string;
	
	alerts: Array<Object>;
	typeOfferModel: string = '0';

	constructor(private sharedService: SharedService,
				public offersService:OffersService,
				private router: Router,
				private searchService: SearchService,
				private profileService: ProfileService){}

	ngOnInit() {
		this.currentUser = this.sharedService.getCurrentUser();
		this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
		//  Retrieving last search
		let jsonResults = this.sharedService.getLastResult();
		if (jsonResults) {
			this.searchResults = jsonResults;
			for (let i = 0; i < this.searchResults.length; i++) {
				let r = this.searchResults[i];
				r.matching = Number(r.matching).toFixed(2);
				r.index = i + 1;
			}
			
			//load profile pictures
			for (let i = 0; i < this.searchResults.length; i++) {
				this.searchResults[i].avatar = "../assets/images/avatar.png"
				var role = this.projectTarget == 'employer' ? "employeur" : "jobyer";
				this.profileService.loadProfilePicture(null, this.searchResults[i].tel, role).then((data: any) => {
					if (data && data.data && !this.isEmpty(data.data[0].encode)) {
						this.searchResults[i].avatar = data.data[0].encode;
					}
				});
			}
		}
    }
	
	/**
     * @description Selecting an item allows to call an action sheet for communications and contract
     * @param item the selected Employer/Jobyer
     */
    itemSelected(item) {
        let o = this.sharedService.getCurrentOffer();
		this.sharedService.setSearchResult(item);
		this.router.navigate(['app/search/details']);
		//this.router.navigate(['app/search/details', {item, o}]);
		//this.nav.push(SearchDetailsPage, {searchResult: item, currentOffer: o});
    }
	
	addAlert(type, msg): void {
		this.alerts = [{type: type, msg: msg}];
	}
	
	isEmpty(str){
		if(str == '' || str == 'null' || !str)
			return true;
		else
			return false;
	}
}