import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {SearchService} from "../../providers/search-service";
import {SharedService} from "../../providers/shared.service";

@Component({
	selector: 'dashboard',
	template: require('./dashboard.html'),
	directives: [ROUTER_DIRECTIVES, AlertComponent],
	providers: [SearchService],
	styles: [require('./dashboard.scss')],
	encapsulation: ViewEncapsulation.None
})

export class Dashboard {
	currentUser: any;
	projectTarget: string;
	scQuery: string;
	alerts: Array<Object>;
	hideLoader: boolean = true;


	constructor(private router: Router,
				private searchService: SearchService,
				private sharedService: SharedService) {}

	ngOnInit(): void {
		this.currentUser = this.sharedService.getCurrentUser();
		if(this.currentUser){
			this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
		}else{
			this.projectTarget = this.sharedService.getProjectTarget();
		}
	}

	doSemanticSearch(){
		if(this.isEmpty(this.scQuery) || !this.scQuery.match(/[a-z]/i)){
			this.addAlert("warning", "Veuillez saisir un job avant de lancer la recherche");
			return;
		}

		this.hideLoader = false;
        this.searchService.semanticSearch(this.scQuery, 0, this.projectTarget).then((data: any) => {
			this.hideLoader = true;
			if(data.length == 0){
				this.addAlert("warning", "Aucun résultat trouvé pour votre recherche.");
				return;
			}
            this.sharedService.setLastResult(data);
		this.router.navigate(['app/search/results']);
        });
    }

	checkForEnterKey(e){
        if(e.code != "Enter")
            return;

        this.doSemanticSearch();
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
