import {Component, NgZone,Input} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {OffersService} from "../../providers/offer.service";



declare var jQuery, require, Messenger: any;

@Component({
  selector: 'modal-delete',
  directives: [ROUTER_DIRECTIVES],
  providers: [OffersService],
  template: require('./modal-delete-element.html'),
  styles: [require('./modal-delete-element.scss')]
})
export class ModalDelete {

  @Input() params: any;
  @Input() initItems: Function;

  currentUser:any = null;
  projectTarget:any;
  message:string;
  removing:boolean = false;


  constructor(private sharedService: SharedService,
              private offersService:OffersService,
              private zone: NgZone,
              private router: Router) {
                this.currentUser = this.sharedService.getCurrentUser();
                if (!this.currentUser) {
                  this.router.navigate(['app/home']);
                } else {
                  this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
                }
  }

  delete(){

    if(this.params.type === 'offer'){
      this.deleteOffer()
    }
  }

  deleteOffer() {
      this.removing =true;
      var offer = this.sharedService.getCurrentOffer();
      console.log(offer);
      if(!offer){
        this.removing =false;
        jQuery("#modal-delete").modal('hide');
        return;
      }
      this.offersService.deleteOffer(offer, this.projectTarget).then((data: any)=> {
        console.log(this.currentUser)
        console.log(this.projectTarget == 'employer')
        console.log(offer);
        if (this.projectTarget == 'employer') {
          let rawData = this.currentUser.employer;
          console.log(rawData)
          if (rawData && rawData.entreprises && rawData.entreprises[0].offers) {
              let index = -1;
              for(let i = 0 ; i < this.currentUser.employer.entreprises[0].offers.length ; i++){
                  console.log(i,this.currentUser.employer.entreprises[0].offers[i].idOffer,offer.idOffer )
                  if(this.currentUser.employer.entreprises[0].offers[i].idOffer == offer.idOffer){
                      index = i;
                      break;
                  }
              }
              console.log(index)
              if(index>=0){
                  this.currentUser.employer.entreprises[0].offers.splice(index,1);
              }
              console.log(this.currentUser)
              this.sharedService.setCurrentUser(this.currentUser);
          }
        } else {
          let rawData = data.jobyer;
                    if (rawData && rawData.offers) {

                        let index = -1;
                        for(let i = 0; i < data.jobyer.offers.length ; i++){
                            if(data.jobyer.offers[i].idOffer == offer.idOffer){
                                index = i;
                                break;
                            }
                        }
                        if(index>=0){
                            data.jobyer.offers.splice(index,1);
                        }

                        this.sharedService.setCurrentUser(data);
                    }
        }
        this.sharedService.setCurrentUser(this.currentUser);


        Messenger().post({
          message: "l'offre "+"'"+offer.title+"'"+" a été supprimée avec succès",
          type: 'success',
          showCloseButton: true
        });
        this.sharedService.setCurrentOffer(null);
        this.removing =false;
        jQuery("#modal-delete").modal('hide')
        this.initItems();
      });
    }



}
