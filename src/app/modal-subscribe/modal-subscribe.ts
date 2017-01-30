import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

declare var jQuery, Messenger: any;
declare var google: any;

@Component({
  selector: '[modal-subscribe]',
  template: require('./modal-subscribe.html'),
  styles: [require('./modal-subscribe.scss')],
  directives: [ROUTER_DIRECTIVES],
})

export class ModalSubscribe {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  redirectToSignup() {
    this.close();
    this.router.navigate(['signup', {
      obj: 'redirect'
    }]);
  }

  redirectToLogin() {
    this.close();
    this.router.navigate(['login', {
      obj: 'redirect'
    }]);
  }

  close(): void {
    jQuery('#modal-subscribe').modal('hide');
  }
}
