import {Component, OnInit} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {Router} from "@angular/router";
import {EntrepriseService} from "../../../providers/entreprise.service";

@Component({
  selector: 'entreprise-selector',
  providers: [EntrepriseService],
  template: require('./entreprise-selector.html')
})
export class EntrepriseSelector implements OnInit {

  entreprises: any;

  constructor(private router: Router,
              private sharedService: SharedService,
              private entrepriseService: EntrepriseService
  ) {
    this.entreprises = this.sharedService.getCurrentUser().employer.entreprises;
  }

  goToEntrepriseCreationPage() {
    this.router.navigate(['entreprise/edit']);
  }

  swapToEntreprise(index) {
    if (index == 0) {
      return;
    }
    this.entrepriseService.swapEntreprise(index);
    this.entreprises = this.sharedService.getCurrentUser().employer.entreprises;
    this.router.navigate(['app/home']);
  }

  ngOnInit(): void {
  }
}
