import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {Utils} from "../../utils/utils";

declare let jQuery: any;

@Component({
  selector: 'recruit-button',
  template: require('./recruit-button.html'),
  styles: [require('./recruit-button.scss')],
})

export class RecruitButton{
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
      //verify if employer profile is filled
      let userData = this.currentUser;
      let currentEmployer = this.currentUser.employer;
      //verification of employer informations
      let redirectToCivility = (currentEmployer && currentEmployer.entreprises[0]) ?
      (Utils.isEmpty(userData.titre)) ||
      (Utils.isEmpty(userData.prenom)) ||
      (Utils.isEmpty(userData.nom)) ||
      (Utils.isEmpty(currentEmployer.entreprises[0].nom)) ||
      (Utils.isEmpty(currentEmployer.entreprises[0].siret)) ||
      (Utils.isEmpty(currentEmployer.entreprises[0].naf)) ||
      (currentEmployer.entreprises[0].conventionCollective.id == 0) ||
      (currentEmployer.entreprises[0].siegeAdress.id == 0) ||
      (currentEmployer.entreprises[0].workAdress.id == 0) : true;
      let isDataValid = !redirectToCivility;
      if (isDataValid) {
        let o = this.sharedService.getCurrentOffer();
        if(o && o != null) {
          //show the contract notification
          this.obj = "contract";
        }else{
          //if there is no selected offer
          this.obj = "offer";
        }
      }else{
        //show profil notif
        this.obj = "profile";
      }
    } else {
      //show auth notif
      this.obj = "auth";
    }
    this.onRecruite.emit({obj: this.obj, jobyer: this.jobyer});
  }
}

