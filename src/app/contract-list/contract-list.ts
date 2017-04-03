import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ContractService} from '../../providers/contract-service';
import {OffersService} from '../../providers/offer.service';
import {Utils} from "../utils/utils";
import {DateUtils} from "../utils/date-utils";
import {Offer} from "../../dto/offer";
import {ContractData} from "../../dto/contract";
import {FinanceService} from "../../providers/finance.service";
import {AlertComponent} from "ng2-bootstrap";
import {GlobalConfigs} from "../../configurations/globalConfigs";
import {Loader} from "../loader/loader";
import {LoaderService} from "../../providers/loader.service";
import {ModalConfirm} from "../modal-confirm/modal-confirm";

declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: '[contract-list]',
  template: require('./contract-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./contract-list.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent, Loader, ModalConfirm],
  providers: [ContractService, OffersService, FinanceService]
})

export class ContractList{
  currentUser: any;
  projectTarget: string;

  contractList = [];
  inProgress: boolean = false;
  alerts = [];

  selectedItem: number = 0;

  constructor(private sharedService: SharedService,
              private router: Router,
              private contractService: ContractService,
              private offerService: OffersService,
              private financeService: FinanceService,
              private loader: LoaderService) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    }
    this.projectTarget = (this.currentUser.estEmployeur || this.currentUser.estRecruteur ? 'employer' : 'jobyer');
  }

  ngOnInit() {
    if(this.projectTarget == 'employer') {
      this.contractService.getNonSignedEmployerContracts(this.currentUser.employer.entreprises[0].id).then((data: any) => {
        if (data && data.status == "success" && data.data) {
          this.contractList = data.data
        }
      });
    }else{
      this.contractService.getNonSignedJobyerContracts(this.currentUser.jobyer.id).then((data: any) => {
        if (data && data.status == "success" && data.data) {
          this.contractList = data.data
        }
      });
    }
  }

  goToDocusignPage(contractInfo) {
    //les recruteurs n'ont pas le droit de signer des contrats
    if(this.currentUser.estRecruteur){
      return;
    }

    if(this.projectTarget == 'jobyer'){
      this.sharedService.setContractData(contractInfo);
      this.router.navigate(['contract/recruitment']);
    }else{
      this.loader.display();
      this.inProgress = true;

      this.contractService.getContractDataInfos(contractInfo.id, this.projectTarget).then((contract: ContractData) => {

        //specify if horaire fixes ou variables
        contract.isScheduleFixed = (contract.isScheduleFixed.toUpperCase() == 'OUI' ? 'true' : 'false');
        //specify equipement string
        if (contract.epiList && contract.epiList.length > 0) {
          contract.equipements = '(Voir annexe)';
        } else {
          contract.equipements = "Aucun";
        }

        //convert epiString to epi list and attach it to the contract object
        contract.epiList = [];
        if(!Utils.isEmpty(contract.epiString) && contract.epiString.split(';') && contract.epiString.split(';').length != 0){
          let epiArray = contract.epiString.split(';');
          for(let i = 0; i < epiArray.length; i++){
            if(!this.isEmpty(epiArray[i])){
              contract.epiList.push(epiArray[i]);
            }
          }
        }

        contract.adresseInterim = contract.workAdress;

        contract.jobyerDebutTitreTravail = DateUtils.simpleDateFormat(new Date(contract.jobyerDebutTitreTravail));
        contract.jobyerFinTitreTravail = DateUtils.simpleDateFormat(new Date(contract.jobyerFinTitreTravail));
        contract.missionStartDate = DateUtils.simpleDateFormat(new Date(contract.missionStartDate));
        contract.missionEndDate = DateUtils.simpleDateFormat(new Date(contract.missionEndDate));

        //initalize jobyer object
        let jobyer = {
          prenom: contract.jobyerPrenom,
          nom: contract.jobyerNom,
          numSS: contract.jobyerNumSS,
          lieuNaissance: contract.jobyerLieuNaissance,
          nationaliteLibelle: contract.jobyerNationaliteLibelle,
          email: contract.email,
          tel: contract.tel,
          address: ''
        };

        //get jobyer address
        this.contractService.getJobyerAdress(contractInfo.jobyerId).then((address: string) => {
          jobyer.address = address;

          //get offer info of the selected contract
          let offer: Offer = new Offer();
          this.offerService.getOfferById(contractInfo.idOffer, this.projectTarget, offer).then(data => {
            if(!data || Utils.isEmpty(data._body) || data.status != "200"){
              this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
              this.inProgress = false;
              this.loader.hide();
              return;
            }
            offer = JSON.parse(data._body);
            //attach offer remuneration to contract object
            contract.salaryNHours = Utils.parseNumber(offer.jobData.remuneration).toFixed(2) + " € B/H";

            //load prerequis of the currrent offer and attach them to contract object
            this.offerService.loadOfferPrerequisObligatoires(contractInfo.idOffer).then((data: any) => {
              offer.jobData.prerequisObligatoires = [];
              for (let j = 0; j < data.length; j++) {
                offer.jobData.prerequisObligatoires.push(data[j].libelle);
              }
              contract.prerequis = offer.jobData.prerequisObligatoires;

              //si le contrat docusign n'a jamais été généré, passer par tout le proccesus de génération
              if(Utils.isEmpty(contract.partnerEmployerLink)){

                this.financeService.loadQuote(contractInfo.idOffer, contract.baseSalary).then((data: any) => {

                  if (!data || Utils.isEmpty(data.quoteId) || data.quoteId == 0) {
                    this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                    this.inProgress = false;
                    this.loader.hide();
                    return;
                  }

                  let idQuote = data.quoteId;

                  this.financeService.loadPrevQuote(contractInfo.idOffer).then((results: any) => {
                    if (!results || !results.lignes || results.lignes.length == 0) {
                      this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                      this.inProgress = false;
                      this.loader.hide();
                      return;
                    }

                    this.contractService.callYousign(this.currentUser, this.currentUser.employer, jobyer, contract, this.projectTarget, offer, idQuote).then((data: any) => {
                      if (!data || data == null || Utils.isEmpty(data.Employeur) || Utils.isEmpty(data.Jobyer) || Utils.isEmpty(data.Employeur.idContrat) || Utils.isEmpty(data.Jobyer.idContrat) || !Utils.isValidUrl(data.Employeur.url) || !Utils.isValidUrl(data.Jobyer.url)) {
                        this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                        this.inProgress = false;
                        this.loader.hide();
                        return;
                      }

                      this.setDocusignData(data, contract);

                      //update contract in Database with docusign data
                      this.contractService.updateContract(contract, this.projectTarget).then((data: any) => {
                        if (!data || data.status != "success") {
                          this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                          this.inProgress = false;
                          this.loader.hide();
                          return;
                        }

                        //set variables in local storage and navigate to docusign page
                        this.sharedService.setCurrentJobyer(jobyer);
                        this.sharedService.setCurrentOffer(offer);
                        this.sharedService.setContractData(contract);

                        this.loader.hide();
                        this.router.navigate(['contract/recruitment']);
                      });
                    });
                  });
                });
                //si le contrat docusign a été déja généré, l'afficher sans le regénérer
              }else{

                //set variables in local storage and navigate to docusign page
                this.sharedService.setCurrentJobyer(jobyer);
                this.sharedService.setCurrentOffer(offer);
                this.sharedService.setContractData(contract);

                this.loader.hide();
                this.router.navigate(['contract/recruitment']);
              }
            });
          });
        });
      });
    }
  }

  setDocusignData(data, contractData: ContractData){
    let partner = GlobalConfigs.global['electronic-signature'];

    let dataValue = null;
    let partnerData = null;
    contractData.partnerEmployerLink = null;

    if (partner === 'yousign') {
      dataValue = data[0]['value'];
      partnerData = JSON.parse(dataValue);
      //get the link yousign of the contract for the employer
      contractData.partnerEmployerLink = partnerData.iFrameURLs[1].iFrameURL;
    } else if (partner === 'docusign') {
      dataValue = data;
      partnerData = dataValue;
      //get the link docusign of the contract for the employer
      contractData.partnerEmployerLink = partnerData.Employeur.url;
    }

    // get the partner link of the contract and the phoneNumber of the jobyer
    contractData.partnerJobyerLink = null;
    if (partner === 'yousign') {
      contractData.partnerJobyerLink = partnerData.iFrameURLs[0].iFrameURL;
      contractData.demandeJobyer = partnerData.idDemands[0].idDemand;
      contractData.demandeEmployer = partnerData.idDemands[1].idDemand;

    } else if (partner === 'docusign') {
      contractData.partnerJobyerLink = partnerData.Jobyer.url;
      contractData.demandeJobyer = partnerData.Jobyer.idContrat;
      contractData.demandeEmployer = partnerData.Employeur.idContrat;
      contractData.enveloppeEmployeur = partnerData.Employeur.folderURL;
      contractData.enveloppeJobyer = partnerData.Jobyer.folderURL;
    }
  }

  goToContractForm(item){
    this.loader.display();

    let offer: any = new Offer();
    //si le numero du contrat est vide, c'est que les infos du contrat n'ont pas encore été saisies
    if(Utils.isEmpty(item.num)){
      console.log("erreur: contrat corrompu");
      this.loader.hide();
      return;
    }else{
      this.contractService.getContractDataInfos(item.id, this.projectTarget).then((data: ContractData) => {
        this.sharedService.setContractData(data);
        let jobyer = {id: data.jobyerId, email: data.email, tel: data.tel, nom: data.jobyerNom, prenom: data.jobyerPrenom, lieuNaissance: data.jobyerLieuNaissance, dateNaissance: data.jobyerBirthDate};
        this.sharedService.setCurrentJobyer(jobyer);
        this.offerService.getOfferById(item.idOffer, this.projectTarget, offer).then(data => {
          this.sharedService.setCurrentOffer(offer);
          this.loader.hide();
          this.router.navigate(['contract/recruitment-form']);
        });
      });
    }
  }

  reassignContract(item) {

  }

  canCancelContract(item): boolean {
    return this.contractService.canCancelContract(this.contractList, item);
  }

  cancelContract(item) {
    jQuery('#modal-confirm').modal('show');
    this.selectedItem = item;
  }

  validateCancelContract(item) {
    let offerId = item.idOffer;
    if (this.canCancelContract(item) == true) {
      this.loader.display();
      this.contractService.cancelContract(this.contractList, item).then(() => {

        // Display message
        Messenger().post({
          message: 'Le contrat a été annulé avec succès',
          type: 'success',
          showCloseButton: true
        });

        this.contractList.splice(this.contractList.indexOf(item), 1);

        // Set offer id
        let offer = new Offer();
        offer.idOffer = offerId;
        this.sharedService.setCurrentOffer(offer);

        this.router.navigate(['offer/edit', {
          obj: 'detail'
        }]);
      });
    }
  }

  actionConfirm() {
    this.validateCancelContract(this.selectedItem);
  }

  actionAborted() {

  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  toDateString(d){
    return DateUtils.toDateString(d);
  }

  toHourString(d){
    return DateUtils.toHourString(d);
  }

  addAlert(type, msg): void {
      this.alerts = [{type: type, msg: msg}];
  }
}
