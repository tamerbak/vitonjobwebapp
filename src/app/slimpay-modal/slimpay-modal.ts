import {Component, Output, EventEmitter} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {Router} from "@angular/router";
import {SlimPayService} from "../../providers/slimpay-services";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {Utils} from "../utils/utils";

declare let jQuery: any;

@Component({
  selector: 'slimpay-modal',
  template: require('./slimpay-modal.html'),
  styles: [require('./slimpay-modal.scss')],
  directives: [AlertComponent],
  providers: [SlimPayService]
})

export class SlimpayModal{
  projectTarget: string;
  currentUser: any;
  alerts: Array<Object>;
  hideLoader = true;

  @Output()
  canceled = new EventEmitter<any>();

  constructor(private sharedService: SharedService,
              private slimpayService: SlimPayService){
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      return;
    }
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    if (this.projectTarget == "jobyer") {
      return;
    }

    this.showSlimPayFrame();
  }

  showSlimPayFrame(){
    this.hideLoader = false;
    this.alerts = [];
    let entrepriseId = this.currentUser.employer.entreprises[0].id;
    this.slimpayService.signSEPA(entrepriseId).then((data: any) => {
      if(!data || this.isEmpty(data.url)){
        this.addAlert("danger", "Erreur: Veuillez vous assurer que les informations de votre profil sont bien renseignés.");
        return;
      }
      //get the SEPA contract url
      let sepaUrl = data.url;
      //Create to Iframe to show the contract in the NavPage
      let iframe = document.createElement('iframe');
      iframe.frameBorder = "0";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.id = "sepaContract";
      iframe.style.overflow = "hidden";
      iframe.style.height = "100%";
      iframe.style.width = "100%";
      iframe.setAttribute("src", sepaUrl);

      document.getElementById("slimPayIFrame").appendChild(iframe);
      this.hideLoader = true;
    });
  }

  checkSEPAState(){
    let entrepriseId = this.currentUser.employer.entreprises[0].id;
    this.slimpayService.checkSEPARequestState(entrepriseId).then((data :any) => {
      let state = data.data[0].etat;
      if(state == "Attente"){
        this.addAlert("warning", "Veuillez terminer la transaction avant de passer à l'étape suivante");
      }else if(state == "Succès"){
        //this.router.navigate(['mission/list']);
        this.closeSlimpayFrame();
      }else{
        this.addAlert("danger", "Votre demande a été rejetée. Nous vous proposons de payer par carte bancaire.");
      }
    })
  }

  closeSlimpayFrame(){
    this.canceled.emit([]);
    this.alerts = [];
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  isEmpty(str){
    return Utils.isEmpty(str);
  }
}
