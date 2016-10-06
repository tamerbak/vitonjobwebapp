import {Component, Input} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

declare var jQuery: any;

@Component({
  selector: '[modal-notification-contract]',
  template: require('./modal-notification-contract.html'),
  directives: [ROUTER_DIRECTIVES]
})
export class ModalNotificationContract {
  @Input()
  jobyer: any;

  currentUser: any;
  projectTarget: string;

  showContractNotif = false;
  showOfferNotif = false;
  showProfilNotif = false;
  showAuthNotif = false;

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    }

    if (this.currentUser) {
      let currentEmployer = this.currentUser.employer;
      let userData = this.currentUser;

      //verification of employer informations
      let redirectToCivility = (currentEmployer && currentEmployer.entreprises[0]) ?
      (userData.titre == "") ||
      (userData.prenom == "") ||
      (userData.nom == "") ||
      (currentEmployer.entreprises[0].nom == "") ||
      (currentEmployer.entreprises[0].siret == "") ||
      (currentEmployer.entreprises[0].naf == "") ||
      (currentEmployer.entreprises[0].siegeAdress.id == 0) ||
      (currentEmployer.entreprises[0].workAdress.id == 0) : true;

      let isDataValid = !redirectToCivility;

      if (isDataValid) {
        let o = this.sharedService.getCurrentOffer();
        //show the contract notification
        if (o) {
          this.showContractNotif = true;
        } else {
          //show the selection offer notif
          this.showOfferNotif = true;
        }
      } else {
        //show profil notif
        this.showProfilNotif = true;
      }
    }
    else {
      this.showAuthNotif = true;
    }
  }

  gotoContractForm() {
    jQuery('#my-modal18-content').modal('hide');
    let o = this.sharedService.getCurrentOffer();
    //navigate to contract page
    if (o != null) {
      this.sharedService.setCurrentJobyer(this.jobyer);
      this.router.navigate(['app/contract/recruitment-form']);
    }
    this.router.navigate(['app/contract/recruitment-form']);
  }

  close(): void {
    jQuery('#my-modal18-content').modal('hide');
  }
}

