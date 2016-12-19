import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ContractService} from '../../providers/contract-service';
import {OffersService} from '../../providers/offer.service';
import {Utils} from "../utils/utils";
import {DateUtils} from "../utils/date-utils";

@Component({
  selector: '[contract-list]',
  template: require('./contract-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./contract-list.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [ContractService, OffersService]
})

export class ContractList{
  currentUser: any;
  projectTarget: string;
  contractList = [];

  constructor(private sharedService: SharedService,
              private router: Router,
              private contractService: ContractService,
              private offerService: OffersService) {
    this.currentUser = this.sharedService.getCurrentUser();
    //only employers and recruiters can access to the contract list page
    if (!this.currentUser || (!this.currentUser.estEmployeur && !this.currentUser.estRecruteur)) {
      this.router.navigate(['home']);
      return;
    }
    this.projectTarget = (this.currentUser.estEmployeur || this.currentUser.estRecruteur ? 'employer' : 'jobyer');
    if (this.projectTarget == "jobyer") {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.contractService.getNonSignedContracts(this.currentUser.employer.entreprises[0].id).then((data: any) => {
      if (data && data.status == "success" && data.data) {
        this.contractList = data.data
      }
    })
  }

  goToDocusignPage(contract){
    //get offer info of the selected contract
    let offer = this.offerService.getOfferByIdFromLocal(this.currentUser, contract.idOffer);

    //initalize jobyer object
    let jobyer = {prenom: contract.prenom, nom: contract.nom, numSS: contract.numSS, lieuNaissance: contract.lieuNaissance, nationaliteLibelle: contract.nationaliteLibelle, email: contract.email, tel: contract.tel, address: ''};

    //get jobyer address
    this.contractService.getJobyerAdress(contract.jobyerId).then((address : string)=>{
      jobyer.address = address;

        //specify if horaire fixes ou variables
      contract.isScheduleFixed = (contract.isScheduleFixed.toUpperCase() == 'OUI' ? 'true' : 'false');

      //attach the company name to the contract object
      contract.companyName = this.currentUser.employer.entreprises[0].nom;

      //attach offer remuneration to contract object
      contract.salaryNHours = Utils.parseNumber(offer.jobData.remuneration).toFixed(2) + " € B/H";

      //convert epiString to epi list and attach it to the contract object
      contract.epiList = [];
      if(contract.epiString && contract.epiString.split(';').length != 0){
        let epiArray = contract.epiString.split(';');
        for(let i = 0; i < epiArray.length; i++){
          if(!this.isEmpty(epiArray[i])){
            contract.epiList.push(epiArray[i]);
          }
        }
      }

      //specify equipement string
      if(contract.epiList && contract.epiList.length > 0) {
        contract.equipements = '(Voir annexe)';
      } else {
        contract.equipements = "Aucun";
      }

      //these infos are not filled or readonly in the contract
      contract.salarySH35 = "+00%";
      contract.salarySH43 = "+00%";
      contract.restRight = "00%";
      contract.customer = "";
      contract.primes = 0;
      contract.indemniteCongesPayes = "10.00%";
      contract.centreMedecineETT = "CMIE";
      contract.adresseCentreMedecineETT = "4 rue de La Haye – 95731 ROISSY EN FRANCE";

        //load prerequis of the currrent offer and attach them to contract object
      this.offerService.loadOfferPrerequisObligatoires(contract.idOffer).then((data:any)=>{
        offer.jobData.prerequisObligatoires = [];
        for(let j = 0 ; j < data.length ; j++){
          offer.jobData.prerequisObligatoires.push(data[j].libelle);
        }
        contract.prerequis = offer.jobData.prerequisObligatoires;

        //load offer address and attach it to contract object
        this.offerService.loadOfferAdress(contract.idOffer, "employeur").then((data: any) => {
          contract.adresseInterim = data;
          contract.workAdress = data;

          //set variables in local storage and navigate to docusign page
          this.sharedService.setCurrentJobyer(jobyer);
          this.sharedService.setCurrentOffer(offer);
          this.sharedService.setContractData(contract);
          this.router.navigate(['contract/recruitment']);
        });
      });
    });
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  toDateString(d){
    return DateUtils.toDateString(d);
  }
}
