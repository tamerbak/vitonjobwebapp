import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ContractService} from '../../providers/contract-service';
import {OffersService} from '../../providers/offer.service';
import {Utils} from "../utils/utils";
import {DateUtils} from "../utils/date-utils";
import {Offer} from "../../dto/offer";
import {ContractData} from "../../dto/contract";

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

  goToDocusignPage(contractInfo){
    this.contractService.getContractDataInfos(contractInfo.id, this.projectTarget).then((contract: ContractData) => {

      //initalize jobyer object
      let jobyer = {prenom: contract.jobyerPrenom, nom: contract.jobyerNom, numSS: contract.jobyerNumSS, lieuNaissance: contract.jobyerLieuNaissance, nationaliteLibelle: contract.jobyerNationaliteLibelle, email: contract.email, tel: contract.tel, address: ''};

      //specify if horaire fixes ou variables
      contract.isScheduleFixed = (contract.isScheduleFixed.toUpperCase() == 'OUI' ? 'true' : 'false');

      //specify equipement string
      if(contract.epiList && contract.epiList.length > 0) {
        contract.equipements = '(Voir annexe)';
      } else {
        contract.equipements = "Aucun";
      }

      //convert epiString to epi list and attach it to the contract object
      contract.epiList = [];
      /*if(contract.epiString && contract.epiString.split(';').length != 0){
        let epiArray = contract.epiString.split(';');
        for(let i = 0; i < epiArray.length; i++){
          if(!this.isEmpty(epiArray[i])){
            contract.epiList.push(epiArray[i]);
          }
        }
      }*/

      //get offer info of the selected contract
      let offer: Offer = new Offer();
      this.offerService.getOfferById(contractInfo.idOffer, this.projectTarget, offer).then(data => {
        offer = data;
        //attach offer remuneration to contract object
        contract.salaryNHours = Utils.parseNumber(offer.jobData.remuneration).toFixed(2) + " € B/H";

        //load prerequis of the currrent offer and attach them to contract object
        this.offerService.loadOfferPrerequisObligatoires(contractInfo.idOffer).then((data:any)=>{
          offer.jobData.prerequisObligatoires = [];
          for(let j = 0 ; j < data.length ; j++){
            offer.jobData.prerequisObligatoires.push(data[j].libelle);
          }
          contract.prerequisObligatoires = offer.jobData.prerequisObligatoires;

          contract.adresseInterim = contract.workAdress;

          //get jobyer address
          this.contractService.getJobyerAdress(contractInfo.jobyerId).then((address : string)=>{
            jobyer.address = address;

            //set variables in local storage and navigate to docusign page
            this.sharedService.setCurrentJobyer(jobyer);
            this.sharedService.setCurrentOffer(offer);
            this.sharedService.setContractData(contract);

            this.router.navigate(['contract/recruitment']);
          });
        });
      });
    });
  }

  goToContractForm(item){
    let offer: any = new Offer();
    //si le numero du contrat est vide, c'est que les infos du contrat n'ont pas encore été saisies
    if(Utils.isEmpty(item.num)){
      console.log("erreur: contrat corrompu");
      return;
    }else{
      this.contractService.getContractDataInfos(item.id, this.projectTarget).then((data: ContractData) => {
        this.sharedService.setContractData(data);
        let jobyer = {id: data.jobyerId, email: data.email, tel: data.tel, nom: data.jobyerNom, prenom: data.jobyerPrenom, lieuNaissance: data.jobyerLieuNaissance, dateNaissance: data.jobyerBirthDate};
        this.sharedService.setCurrentJobyer(jobyer);
        this.offerService.getOfferById(item.idOffer, this.projectTarget, offer).then(data => {
          this.sharedService.setCurrentOffer(offer);
          this.router.navigate(['contract/recruitment-form']);
        });
      });
    }
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  toDateString(d){
    return DateUtils.toDateString(d);
  }
}
