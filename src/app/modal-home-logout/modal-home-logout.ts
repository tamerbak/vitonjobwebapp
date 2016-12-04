import {Component, NgZone} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";



declare var jQuery;

@Component({
  selector: '[modal-home-logout]',
  directives: [ROUTER_DIRECTIVES],
  template: require('./modal-home-logout.html'),
  styles: [require('./modal-home-logout.scss')]
})
export class ModalHomeLogout {


  currentUser: any;


  constructor(private sharedService: SharedService, private router: Router,private zone: NgZone) {
    this.currentUser = this.sharedService.getCurrentUser();

}
ngOnInit(): void {

  if (this.router.url === '/home') {
    if(this.currentUser === null){
      jQuery('#modal-home-logout').modal('show');
      }
  }
}
  selectProjectTargetEmployer() {
    this.router.navigate(['/employeur']);
    jQuery('#modal-home-logout').modal('hide');
  }
  selectProjectTargetJobyer() {
    this.router.navigate(['/jobyer']);
    jQuery('#modal-home-logout').modal('hide');
  }
}
