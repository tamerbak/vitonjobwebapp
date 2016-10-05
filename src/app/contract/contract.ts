import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Helpers} from "../../providers/helpers.service";
import {SharedService} from "../../providers/shared.service";
import {ContractService} from "../../providers/contract-service";
import {MedecineService} from "../../providers/medecine.service";
import {ParametersService} from "../../providers/parameters-service";

/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./contract.html'),
  styles: [require('./contract.scss')],
  providers: [ContractService, MedecineService, ParametersService, Helpers]
})
export class Contract {

  numContrat: string = '';
  projectTarget: string;
  isEmployer: boolean;

  employer: any;
  jobyer: any;
  companyName: string;
  currentUser: any;
  employerFullName: string;
  jobyerFirstName: string;
  jobyerLastName: string;
  contractData: any;
  currentOffer: any;
  workAdress: string;
  jobyerBirthDate: string;
  hqAdress: string;
  rate: number = 0.0;
  recours: any;
  justificatifs: any;

  dataValidation :boolean = false;

  dateFormat(d) {
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;
    return sd;
  }

  constructor(private medecineService: MedecineService,
              private service: ParametersService,
              private contractService: ContractService,
              private sharedService: SharedService,
              private router: Router) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    }
    // Get target to determine configs
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    this.isEmployer = (this.projectTarget == 'employer');

    // Retrieve jobyer
    this.jobyer = this.sharedService.getCurrentJobyer();

    let bd = new Date(this.jobyer.dateNaissance);

    this.jobyerFirstName = this.jobyer.prenom;
    this.jobyerLastName = this.jobyer.nom;
    this.jobyerBirthDate = this.dateFormat(bd);
    this.jobyer.id = 0;
    this.jobyer.numSS = '';
    this.jobyer.nationaliteLibelle = '';

    this.contractService.getJobyerComplementData(this.jobyer, this.projectTarget).then((data: any)=> {
      if (data) {
        let datum = data[0];
        this.jobyer.id = datum.id;
        this.jobyer.numSS = datum.numss;
        this.jobyer.nationaliteLibelle = datum.nationalite;
      }
    });

    // Initialize contract data
    this.contractData = {
      num: "",
      numero: "",
      centreMedecineEntreprise: "",
      adresseCentreMedecineEntreprise: "",
      centreMedecineETT: "181 - CMIE",
      adresseCentreMedecineETT: "80 RUE DE CLICHY 75009 PARIS",
      contact: this.employerFullName,
      indemniteFinMission: "0.00",
      indemniteCongesPayes: "0.00",
      moyenAcces: "",
      numeroTitreTravail: "",
      debutTitreTravail: "",
      finTitreTravail: "",
      periodesNonTravaillees: "",
      debutSouplesse: "",
      finSouplesse: "",
      equipements: "",

      interim: "Groupe 3S",
      missionStartDate: this.getStartDate(),
      missionEndDate: this.getEndDate(),
      trialPeriod: 5,
      termStartDate: this.getEndDate(),
      termEndDate: this.getEndDate(),
      motif: "",
      justification: "",
      qualification: "",
      characteristics: "",
      workTimeHours: 0,
      workTimeVariable: 0,
      usualWorkTimeHours: "8H00/17H00 variables",
      workStartHour: "00:00",
      workEndHour: "00:00",
      workHourVariable: "",
      postRisks: "",
      medicalSurv: "",
      epi: "",
      baseSalary: 0,
      MonthlyAverageDuration: "0",
      salaryNHours: "00,00€ B/H",
      salarySH35: "+00%",
      salarySH43: "+00%",
      restRight: "00%",
      interimAddress: "",
      customer: "",
      primes: "",
      headOffice: "",
      missionContent: "",
      category: "",
      sector: "",
      companyName: '',
      titreTransport: 'NON',
      zonesTitre: '',
      risques: '',
      elementsCotisation: 0.0,
      elementsNonCotisation: 10.0,
      titre: ''
    };

    //  Load recours list
    this.contractService.loadRecoursList().then(data=> {
      this.recours = data;
    });

    // Get the currentEmployer
    this.currentUser = this.sharedService.getCurrentUser();

    if (this.currentUser) {
      this.employer = this.currentUser.employer;
      this.companyName = this.employer.entreprises[0].nom;
      this.workAdress = this.employer.entreprises[0].workAdress.fullAdress;
      this.hqAdress = this.employer.entreprises[0].siegeAdress.fullAdress;
      let civility = this.currentUser.titre;
      this.employerFullName = civility + " " + this.currentUser.nom + " " + this.currentUser.prenom;
      this.medecineService.getMedecine(this.employer.entreprises[0].id).then((data: any)=> {
        if (data && data != null) {
          //debugger;
          this.contractData.centreMedecineEntreprise = data.libelle;
          this.contractData.adresseCentreMedecineEntreprise = data.adresse + ' ' + data.code_postal;
        }

      });
    }

    // Check if there is a current offer
    this.currentOffer = this.sharedService.getCurrentOffer();
    if (this.currentOffer) {
      this.service.getRates().then((data: any) => {
        // debugger;
        for (let i = 0; i < data.length; i++) {
          if (this.currentOffer.jobData.remuneration < data[i].taux_horaire) {
            this.rate = parseFloat(data[i].coefficient) * this.currentOffer.jobData.remuneration;
            this.contractData.elementsCotisation = this.rate;
            break;
          }
        }
      });

      this.initContract();
    }
  }

  // recoursSelected(evt) {
  //   debugger;
  //   let selectedRecoursLib = evt;
  //   let id = 40;
  //   for (let i = 0; i < this.recours.length; i++)
  //     if (this.recours[i].libelle == selectedRecoursLib) {
  //       id = this.recours[i].id;
  //       break;
  //     }
  //
  //   this.justificatifs = [];
  //   this.contractService.loadJustificationsList(id).then(data=> {
  //     this.justificatifs = data;
  //   });
  // }

  formatNumContrat(num) {
    let snum = num + "";
    let zeros = 10 - snum.length;
    if (zeros < 0)
      return snum;

    for (let i = 0; i < zeros; i++)
      snum = "0" + snum;

    return snum;
  }

  getStartDate() {

    let d = new Date();
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;

    if (!this.currentOffer) {
      return sd;
    }
    if (!this.currentOffer.calendarData || this.currentOffer.calendarData.length == 0) {
      return sd;
    }

    let minDate = this.currentOffer.calendarData[0].date;
    for (let i = 1; i < this.currentOffer.calendarData.length; i++) {
      if (this.currentOffer.calendarData[i].date < minDate) {
        minDate = this.currentOffer.calendarData[i].date;
      }
    }
    d = new Date(minDate);
    m = d.getMonth() + 1;
    da = d.getDate();
    sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;

    return sd;
  }

  getEndDate() {
    let d = new Date();
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;

    if (!this.currentOffer) {
      return sd;
    }
    if (!this.currentOffer.calendarData || this.currentOffer.calendarData.length == 0) {
      return sd;
    }

    let maxDate = this.currentOffer.calendarData[0].date;
    for (let i = 1; i < this.currentOffer.calendarData.length; i++) {
      if (this.currentOffer.calendarData[i].date > maxDate) {
        maxDate = this.currentOffer.calendarData[i].date;
      }
    }

    d = new Date(maxDate);
    m = d.getMonth() + 1;
    da = d.getDate();
    sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;

    return sd;
  }

  // selectOffer() {
  //   //debugger;
  //   let m = new Modal(ModalOffersPage);
  //   m.onDismiss(data => {
  //     this.currentOffer = data;
  //     console.log(JSON.stringify(data));
  //     //debugger;
  //     this.service.getRates().then(data => {
  //       //debugger;
  //       for (let i = 0; i < data.length; i++) {
  //         if (this.currentOffer.jobData.remuneration < data[i].taux_horaire) {
  //           this.rate = parseFloat(data[i].coefficient) * this.currentOffer.jobData.remuneration;
  //           this.contractData.elementsCotisation = this.rate;
  //           break;
  //         }
  //       }
  //
  //
  //     });
  //     this.initContract();
  //   });
  //   this.nav.present(m);
  // }

  initContract() {
    this.contractData = {
      num: this.numContrat,
      centreMedecineEntreprise: "",
      adresseCentreMedecineEntreprise: "",
      centreMedecineETT: "181 - CMIE",
      adresseCentreMedecineETT: "80 RUE DE CLICHY 75009 PARIS",

      numero: "",
      contact: this.employerFullName,
      indemniteFinMission: "0.00",
      indemniteCongesPayes: "0.00",
      moyenAcces: "",
      numeroTitreTravail: "",
      debutTitreTravail: "",
      finTitreTravail: "",
      periodesNonTravaillees: "",
      debutSouplesse: "",
      finSouplesse: "",
      equipements: "",
      interim: "Groupe 3S",
      missionStartDate: this.getStartDate(),
      missionEndDate: this.getEndDate(),
      trialPeriod: 5,
      termStartDate: this.getEndDate(),
      termEndDate: this.getEndDate(),
      motif: "",
      justification: "",
      qualification: this.currentOffer.title,
      characteristics: "",
      workTimeHours: this.calculateOfferHours(),
      workTimeVariable: 0,
      usualWorkTimeHours: "8H00/17H00 variables",
      workStartHour: "00:00",
      workEndHour: "00:00",
      workHourVariable: "",
      postRisks: "",
      medicalSurv: "",
      epi: "",
      baseSalary: this.parseNumber(this.currentOffer.jobData.remuneration).toFixed(2),
      MonthlyAverageDuration: "0",
      salaryNHours: this.parseNumber(this.currentOffer.jobData.remuneration).toFixed(2) + " € B/H",
      salarySH35: "+00%",
      salarySH43: "+00%",
      restRight: "00%",
      interimAddress: "",
      customer: "",
      primes: "",
      headOffice: this.hqAdress,
      missionContent: "",
      category: this.currentOffer.jobData.job,
      sector: this.currentOffer.jobData.sector,
      companyName: this.companyName,
      workAdress: this.workAdress,
      jobyerBirthDate: this.jobyerBirthDate,
      titreTransport: 'NON',
      zonesTitre: '',
      risques: '',
      elementsCotisation: this.rate,
      elementsNonCotisation: 10.0,
      titre: this.currentOffer.title
    };

    // console.log(JSON.stringify(this.contractData));

    this.medecineService.getMedecine(this.employer.entreprises[0].id).then((data: any)=> {
      // debugger;
      if (data && data != null) {
        this.contractData.centreMedecineEntreprise = data.libelle;
        this.contractData.adresseCentreMedecineEntreprise = data.adresse + ' ' + data.code_postal;
      }

    });
  }

  parseNumber(str) {
    try {
      return parseFloat(str);
    }
    catch (err) {
      return 0.0;
    }
  }

  // TODO To check return 0 ou '' ou null
  calculateOfferHours(): string {
    if (!this.currentOffer)
      return '0';
    let h = 0;
    for (let i = 0; i < this.currentOffer.calendarData.length; i++) {
      let calendarEntry = this.currentOffer.calendarData[i];
      h = h + Math.abs(calendarEntry.endHour - calendarEntry.startHour) / 60;
    }
    return h.toFixed(0);
  }

  goToYousignPage() {
    //debugger;
    this.contractService.getNumContract().then((data: any) => {
      this.dataValidation = true;

      if (data && data.length > 0) {
        this.numContrat = this.formatNumContrat(data[0].numct);
        this.contractData.num = this.numContrat;
        this.contractData.numero = this.numContrat;
        this.contractData.adresseInterim = this.workAdress;
      }

      // Go to yousign
      this.sharedService.setCurrentJobyer(this.jobyer);
      this.sharedService.setCurrentOffer(this.currentOffer);
      this.sharedService.setContractData(this.contractData);
      this.router.navigate(['app/contract/recruitment']);
    });
  }

  formHasChanges(){
    if(this.dataValidation){
      return false;
    }
    return true;
  }

  // /**
  //  * @author daoudi amine
  //  * @description show the menu to edit employer's informations
  //  */
  // showMenuToEditContract() {
  //   let actionSheet = ActionSheet.create({
  //     title: 'Editer le contrat',
  //     buttons: [
  //       {
  //         text: 'Civilité',
  //         icon: 'md-person',
  //         handler: () => {
  //           this.nav.push(CivilityPage);
  //         }
  //       }, {
  //         text: 'Siège social',
  //         icon: 'md-locate',
  //         handler: () => {
  //           this.nav.push(JobAddressPage);
  //         }
  //       }, {
  //         text: 'Adresse de travail',
  //         icon: 'md-locate',
  //         handler: () => {
  //           this.nav.push(PersonalAddressPage);
  //         }
  //       }, {
  //         text: 'Annuler',
  //         role: 'cancel',
  //         icon: 'md-close',
  //         handler: () => {
  //
  //         }
  //       }
  //     ]
  //   });
  //
  //   this.nav.present(actionSheet);
  // };

}
