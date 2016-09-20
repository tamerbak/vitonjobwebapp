import {Component, ViewEncapsulation} from '@angular/core';
import {SharedService} from "../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {SearchService} from "../providers/search-service";
import {ProfileService} from "../providers/profile.service";

@Component({
  selector: '[search-results]',
  template: require('./search-results.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./search-results.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [SearchService, ProfileService]
})
export class SearchResults {
	searchResults:any;
	currentUser: any;
    projectTarget: string;

	constructor(private sharedService: SharedService,
				private router: Router,
				private profileService: ProfileService){}

	ngOnInit() {
		this.currentUser = this.sharedService.getCurrentUser();
		if(this.currentUser){
			this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
		}else{
			this.projectTarget = this.sharedService.getProjectTarget();
		}
		//  Retrieving last search
		let jsonResults = this.sharedService.getLastResult();
		if (jsonResults) {
			this.searchResults = jsonResults;
			for (let i = 0; i < this.searchResults.length; i++) {
				let r = this.searchResults[i];
				r.matching = Number(r.matching).toFixed(2);
				r.index = i + 1;
				r.avatar = "../assets/images/avatar.png"
			}
			
			//load profile pictures
			for (let i = 0; i < this.searchResults.length; i++) {
				var role = this.projectTarget == 'employer' ? "employeur" : "jobyer";
				this.profileService.loadProfilePicture(null, this.searchResults[i].tel, role).then((data: any) => {
					if(data && data.data && data.data[0] && !this.isEmpty(data.data[0].encode)){
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
    }
	
	isEmpty(str){
		if(str == '' || str == 'null' || !str)
			return true;
		else
			return false;
	}
}