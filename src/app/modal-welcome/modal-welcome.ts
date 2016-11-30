import {Component} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
declare var jQuery: any;

@Component({
  selector: '[modal-welcome]',
  template: require('./modal-welcome.html')
})

export class ModalWelcome{
  currentUser: any;
  projectTarget: string;

  msgWelcome1: string;
  msgWelcome2: string;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));

      this.msgWelcome1 = "Bienvenue dans Vit-On-Job";
      this.msgWelcome2 = "Vous êtes tout près de trouver votre " + (this.projectTarget == "jobyer" ? 'emploi.' : 'Jobyer.');
    }
  }

  goToModalProfile(){
    this.close();
  }

  close(): void {
    jQuery('#modal-welcome').modal('hide');
  }
}
