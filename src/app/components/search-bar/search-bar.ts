/**
 * Created by kelvin on 31/01/2017.
 */

import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {Utils} from "../../utils/utils";
import {SearchService} from "../../../providers/search-service";
import {SharedService} from "../../../providers/shared.service";
import {AlertComponent} from "ng2-bootstrap";

declare var jQuery, Messenger, md5: any;

@Component({
  selector: '[search-bar]',
  template: require('./search-bar.html'),
  styles: [require('./search-bar.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [],
})
export class SearchBar {

  @Input()
  searchMethod: string = "";

  @Input()
  keepLastResearch: boolean = false;

  scQuery: string;
  placeholder: string;
  placeholderShort: string;
  hideLoader: boolean = true;

  alerts: Array<Object>;

  projectTarget: string;

  constructor(private searchService: SearchService, private sharedService: SharedService, private router: Router) {

    let role = this.sharedService.getProjectTarget();
    if (role == "employer") {
      this.projectTarget = "employer";
    } else {
      this.projectTarget = "jobyer";
    }
  }

  ngOnInit() {
    switch (this.searchMethod) {
      case 'semantic':
        this.placeholder = "Rechercher les offres par critères....";
        this.placeholderShort = "Rechercher tous critères....";
        break;
      case 'location':
        this.placeholder = "Rechercher les offres dans une ville....";
        this.placeholderShort = "Rechercher par ville....";
        break;
    }
  }

  ngAfterViewInit(): void {
    let self = this;
    // Catch enter from search inputs to launch search
    jQuery('.search-bar-input-' + this.searchMethod).keydown(function (e) {
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if (key == 13) {
        e.preventDefault();
        self.doSearch();
      }
    });
  }

  doSearch() {
    console.log('search');
    switch (this.searchMethod) {
      case 'semantic':
        this.doSemanticSearch();
        break;
      case 'location':
        this.doOffersByCitySearch();
        break;
    }
  }

  doSemanticSearch() {
    if (Utils.isEmpty(this.scQuery) || !this.scQuery.match(/[a-z]/i)) {
      this.addAlert("warning", "Veuillez saisir une requête avant de lancer la recherche");
      return;
    }

    this.hideLoader = false;
    this.searchService.semanticSearch(this.scQuery, 0, this.projectTarget).then((results: any) => {
      this.hideLoader = true;
      let data = (this.projectTarget == 'jobyer') ? results.offerEnterprise : results.offerJobyers;
      this.sharedService.setLastIndexation({resultsIndex : results.indexation});
      this.sharedService.setLastResult(data);
      this.sharedService.setCurrentSearch(this.scQuery);
      this.sharedService.setCurrentSearchCity(null);
      this.router.navigate(['search/results', {
        searchType:'semantic'
      }]);
    });
  }

  doOffersByCitySearch() {
    if (Utils.isEmpty(this.scQuery) || !this.scQuery.match(/[a-z]/i)) {
      this.addAlert("warning", "Veuillez saisir le nom d'une ville avant de lancer la recherche");
      return;
    }

    this.hideLoader = false;
    this.searchService.searchOffersByCity(this.scQuery, this.projectTarget).then((data: any) => {
      this.hideLoader = true;
      this.sharedService.setLastResult(data);
      this.sharedService.setCurrentSearch(null);
      this.sharedService.setCurrentSearchCity(this.scQuery);
      this.router.navigate(['search/results']);
    });
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
