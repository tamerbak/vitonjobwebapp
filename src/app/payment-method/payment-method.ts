import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {Router} from "@angular/router";
import {WalletCreate} from "../wallet-create/wallet-create";

@Component({
  selector: '[payment-method]',
  template: require('./payment-method.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./payment-method.scss')],
  directives: [WalletCreate],
})

export class PaymentMethod{
  projectTarget: string;
  currentUser: any;
  isPayline = false;
  isSlimPay = false;

  constructor(private sharedService: SharedService,
              private router: Router){
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    }
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    if (this.projectTarget == "jobyer") {
      this.router.navigate(['app/home']);
    }
  }

  showWalletCreate(){
    this.isPayline = true;
    this.isSlimPay = false;
  }

  showSlimPayFrame(){
    this.isPayline = false;
    this.isSlimPay = true;
  }

  isEmpty(str){
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
