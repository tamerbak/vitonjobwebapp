import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {PaylineServices} from "../../providers/payline-services";

@Component({
  selector: '[wallet-create]',
  template: require('./wallet-create.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./wallet-create.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [PaylineServices]
})

export class WalletCreate {
  currentUser: any;
  projectTarget: string;
  alerts: Array<Object> = [];
  hideLoader: boolean = true;

  existingWallet: boolean = false;
  cardNumber: string;
  cardExpirationDate: number;
  cardCvv: string;
  cardType: string = "CB";
  walletMsg: any;

  dataValidation:boolean = false;

  constructor(private sharedService: SharedService,
              private service: PaylineServices,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    }
  }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    } else {
      this.router.navigate(['app/home']);
      return;

    }

    this.service.checkWallet(this.currentUser).then((walletId: any) => {
      if (walletId && walletId != 'null' && walletId.length > 0) {
        this.existingWallet = true;
        let cnum = walletId.substring(walletId.length - 4);
        this.walletMsg = {
          type: 'success',
          msg: 'Si vous désirez utiliser la même carte bancaire que vous avez renseigné au préalable (XXXXXXXXXXXX' + cnum + ') vous pouvez passer cette étape.' + '<a class="btn btn-primary btn-xs pull-xs-right mr-xs" href="#/app/mission/list">Passer</a>'
        }
        this.addAlert("", "");
      }
    });
  }

  openWallet() {
    let card = {
      cardNumber: this.cardNumber,
      cardType: this.cardType,
      expireDate: this.cardExpirationDate,
      cvx: this.cardCvv
    };

    this.dataValidation = false;
    this.hideLoader = false;
    this.service.empreinteCarte(card, this.currentUser).then((data: any) => {
      this.hideLoader = true;
      if (data.code == '02500') {
        this.router.navigate(['app/mission/list']);
      } else {
        this.addAlert("danger", "<b>Erreur lors de validation de la carte:</b> Le numéro de carte bancaire doit comporter 16 chiffres et doit être valide");
      }
    });
  }

  addAlert(type, msg): void {
    this.alerts = [];
    this.alerts = [this.walletMsg];
    if (!this.isEmpty(type)) {
      this.alerts.push({type: type, msg: msg});
    }
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }

  formHasChanges(){
    if(this.dataValidation){
      return false;
    }
    return true;
  }
}
