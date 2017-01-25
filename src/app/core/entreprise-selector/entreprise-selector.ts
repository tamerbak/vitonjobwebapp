import {Component, OnInit} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {Router} from "@angular/router";
import {EntrepriseService} from "../../../providers/entreprise.service";

@Component({
  selector: 'entreprise-selector',
  providers: [EntrepriseService],
  template: require('./entreprise-selector.html'),
  styles: [require('./entreprise-selector.scss')]
})
export class EntrepriseSelector implements OnInit {

  entreprises: any;
  currentEntreprise: any;

  constructor(private router: Router,
              private sharedService: SharedService,
              private entrepriseService: EntrepriseService
  ) {
    let currentUser = this.sharedService.getCurrentUser();
    if (currentUser && currentUser.estEmployeur) {
      this.entreprises = currentUser.employer.entreprises;
      this.currentEntreprise = this.entreprises[0];
    }
  }

  goToEntrepriseCreationPage() {
    this.router.navigate(['entreprise/edit']);
  }

  swapToEntreprise(index) {
    if (index == 0) {
      return;
    }
    let currentUser = this.sharedService.getCurrentUser();
    if (currentUser && currentUser.estEmployeur) {
      this.entreprises = this.entrepriseService.swapEntreprise(index);
      this.currentEntreprise = this.entreprises[0];
    }
    this.router.navigate(['app/home']);
  }

  ngOnInit(): void {
  }
}
