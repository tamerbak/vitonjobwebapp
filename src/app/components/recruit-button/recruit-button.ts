import {Component, Input} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {ModalNotificationContract} from "../../modal-notification-contract/modal-notification-contract";
import {ModalProfile} from "../../modal-profile/modal-profile";
import {Subject} from "rxjs";

declare var jQuery: any;

@Component({
  selector: 'recruit-button',
  template: require('./recruit-button.html'),
  directives: [ModalNotificationContract, ModalProfile]
})

export class RecruitButton {
  //@Output() onRecruite = new EventEmitter<string>();
  //obj: string;

  @Input()
  jobyer: any;

  currentUser: any;
  projectTarget: string;

  obj: string;
  fromPage: string;

  constructor(private sharedService: SharedService) {
    this.fromPage = "recruitment";
  }

  recruitJobyer() {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser && this.currentUser.employer) {
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
        let o = this.sharedService.getCurrentOffer();
        //show the contract notification
        if (o) {
          this.obj = "contract";
        } else {
          //show the selection offer notif
          this.obj = "offer";
        }
      } else {
        //show profil notif
        this.obj = "profile";
      }
      this.openModal(this.obj);
    }
    else {
      return;
    }
    //this.onRecruite.emit(this.obj);
  }

  openModal(obj){
    if(obj == "contract" || obj == "offer"){
      jQuery('#modal-notification-contract').modal('show');
    }
    if(obj == "profile"){
      jQuery('#modal-profile').modal('show');
    }
  }

  /*gotoContractForm() {
    jQuery('#my-modal18-content').modal('hide');
    let o = this.sharedService.getCurrentOffer();
    //navigate to contract page
    if (o != null) {
      this.sharedService.setCurrentJobyer(this.jobyer);
      this.router.navigate(['app/contract/recruitment-form']);
    }
    this.router.navigate(['app/contract/recruitment-form']);
  }*/

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}

