import {Component, EventEmitter, Input, Output } from "@angular/core";
import {SharedService} from "../../../providers/shared.service";

declare var jQuery: any;

@Component({
  selector: 'recruit-button',
  template: require('./recruit-button.html'),
})

export class RecruitButton {
  @Input()
  jobyer: any;
  @Output()
  onRecruite = new EventEmitter<any>();

  currentUser: any;
  projectTarget: string;

  obj: string;

  constructor(private sharedService: SharedService) {
  }

  recruitJobyer() {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser && this.currentUser.employer) {
      let o = this.sharedService.getCurrentOffer();
      //if there is no selected offer
      if(!o || o == null){
        this.obj = "offer";
      }else{
        //verify if employer profile is filled
        let userData = this.currentUser;
        let currentEmployer = this.currentUser.employer;
        //verification of employer informations
        let redirectToCivility = (currentEmployer && currentEmployer.entreprises[0]) ?
        (this.isEmpty(userData.titre)) ||
        (this.isEmpty(userData.prenom)) ||
        (this.isEmpty(userData.nom)) ||
        (this.isEmpty(currentEmployer.entreprises[0].nom)) ||
        (this.isEmpty(currentEmployer.entreprises[0].siret)) ||
        (this.isEmpty(currentEmployer.entreprises[0].naf)) ||
        (currentEmployer.entreprises[0].conventionCollective.id == 0) ||
        (currentEmployer.entreprises[0].siegeAdress.id == 0) ||
        (currentEmployer.entreprises[0].workAdress.id == 0) : true;
        let isDataValid = !redirectToCivility;
        if (isDataValid) {
          //show the contract notification
          this.obj = "contract";
        }else{
          //show profil notif
          this.obj = "profile";
        }
      }
      this.onRecruite.emit({obj: this.obj, jobyer: this.jobyer});
    }
    else {
      return;
    }
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}

