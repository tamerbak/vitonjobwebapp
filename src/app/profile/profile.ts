import {Component, NgZone, ViewEncapsulation, ViewChild} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {ProfileService} from "../../providers/profile.service";
import {CommunesService} from "../../providers/communes.service";
import {LoadListService} from "../../providers/load-list.service";
import {MedecineService} from "../../providers/medecine.service";
import {AttachementsService} from "../../providers/attachements.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {AddressUtils} from "../utils/addressUtils";
import {Configs} from "../../configurations/configs";
import {MapsAPILoader} from "angular2-google-maps/core";
import {ModalPicture} from "../modal-picture/modal-picture";
import {ModalCorporamaSearch} from "../modal-corporama-search/modal-corporama-search";
import {BankAccount} from "../bank-account/bank-account";
import MaskedInput from "angular2-text-mask";
import {AccountConstraints} from "../../validators/account-constraints";
import {scan} from "rxjs/operator/scan";
import {ConventionService} from "../../providers/convention.service";
import {OffersService} from "../../providers/offer.service";
import {EnvironmentService} from "../../providers/environment.service";
import {SelectLanguages} from "../components/select-languages/select-languages";

declare var jQuery, require, Messenger, moment: any;
declare var google: any;

@Component({
  selector: '[profile]',
  template: require('./profile.html'),
  providers: [Utils, ProfileService, CommunesService, LoadListService, MedecineService, AttachementsService, AccountConstraints, ConventionService, OffersService, EnvironmentService],
  directives: [ROUTER_DIRECTIVES, NKDatetime, AlertComponent, ModalPicture, MaskedInput, BankAccount, ModalCorporamaSearch, SelectLanguages],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')]
})
export class Profile{
  public maskSiret = [/[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  public maskApe = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /^[a-zA-Z]*$/]

  @ViewChild('myForm') form;

  projectTarget: string;
  title: string = "M.";
  lastname: string;
  firstname: string;
  companyname: string;
  siret: string;
  ape: string;
  birthcp: string;
  birthdep: string;
  birthdepId: string;
  birthplace: string;

  selectedCP: any;

  // Contain the displayed and formatted date
  birthdate: Date;
  // Contain the data to check and save
  birthdateHidden: Date;

  selectedMedecine: any = {id: 0, libelle: ""};
  cni: string;
  numSS: string;
  nationalityId: any = "91";
  nationalities = [];
  personalAddress: string;
  jobAddress: string;
  correspondenceAddress: string;

  isValidPersonalAddress: boolean = true;
  isValidJobAddress: boolean = true;
  isValidCorrespondenceAddress: boolean = true;
  isValidLastname: boolean = true;
  isValidFirstname: boolean = true;
  isValidCompanyname: boolean = true;
  isValidSiret: boolean = true;
  isValidConventionId: boolean = true;
  isValidApe: boolean = true;
  isValidBirthdate: boolean = true;
  isValidCni: boolean = true;
  isValidNumSS: boolean = true;

  lastnameHint: string = "";
  firstnameHint: string = "";
  companynameHint: string = "";
  siretHint: string = "";
  apeHint: string = "";
  birthdateHint: string = "";
  cniHint: string = "";
  numSSHint: string = "";
  selectedCommune: any = {id: '0', nom: '', code_insee: ''}
  dataForNationalitySelectReady = false;
  scanData: string = "";
  //PersonalAddress params
  cityPA: string;
  countryPA: string;
  streetPA: string;
  streetNumberPA: string;
  namePA: string;
  zipCodePA: string;

  //JobAddress params
  cityJA: string;
  countryJA: string;
  streetJA: string;
  streetNumberJA: string;
  nameJA: string;
  zipCodeJA: string;

   //CorrespondenceAddress params
  cityCA: string;
  countryCA: string;
  streetCA: string;
  streetNumberCA: string;
  nameCA: string;
  zipCodeCA: string;


  //currentUser object
  currentUser: any;
  currentUserFullname: string;
  phoneNumber: string;
  email: string;
  isNewUser: boolean;
  isEmployer: boolean;
  isRecruiter: boolean;
  accountId: string;
  userRoleId: string;

  //styles && vars
  showForm: boolean = false;
  scanTitle: string;
  validation: boolean = false;
  siretAlert: string = "";
  showCurrentSiretBtn: boolean = false;
  companyAlert: string = "";
  showCurrentCompanyBtn: boolean = false;
  personalAddressLabel: string = "du siège";
  jobAddressLabel: string = "Adresse du lieu de travail";
  autocompletePA: any;
  autocompleteJA: any;
  autocompleteCA: any;
  addressOptions = {
    componentRestrictions: {country: "fr"}
  };
  communesData: any = [];
  isFrench: boolean;
  isEuropean: number = 0;
  pays = [];
  index: number = 33;

  numStay;
  dateStay:Date;
  dateFromStay:Date;
  dateToStay:Date;
  whoDeliverStay;
  regionId = "41";
  selectedDep;
  isResident: boolean = true;
  isCIN: boolean = true;

  /*
   Conventions collectives
   */
  conventionId: number;
  conventions: any = [];
  collective_heure_hebdo: number;

  /*
   * Multiple uploads
   */
  allImages: any[];
  currentImg: any;
  currentHeightIndex: number = 0;
  currentWidth: number = 0;

  offerStats: any = {
    published_offers: '',
  };

  missionStats: any = {
    pending_recruitments: '',
    missions_in_progress: '',
  };

  //quality management
  savedQualities: any = [];
  selectedQuality: any;
  qualities: any = [];

  //languages management
  savedLanguages: any = [];
  selectedLanguage: any;
  selectedLevel = "1";
  languages: any = [];


  // availabilities
  disponibilites = [];
  dispoToCreate : any;
  datepickerOpts: any;

  //cv
  cv: string;

  //nb work and study hours
  isNbStudyHoursBig: boolean = false;
  nbWorkHours: number;
  nbWorkVitOnJob: number;

  /*
   * REQUIREMENTS
   */
  jobs : any = [];

  /*
   * INTERESTING JOBS
   */
  jobsList : any = [];
  selectedJob : any;
  selectedJobId : any;
  interestingJobs : any[];
  selectedJobLevel : string;

  savedSoftwares: any[] = [];
  selectedSoftware: any;
  softwares: any[];
  expSoftware: number = -1;

  setImgClasses() {
    return {
      'img-circle': true,//TODO:this.currentUser && this.currentUser.estEmployeur,
    };
  }

  constructor(private listService: LoadListService,
              private profileService: ProfileService,
              private sharedService: SharedService,
              private medecineService: MedecineService,
              private communesService: CommunesService,
              private attachementsService: AttachementsService,
              private conventionService: ConventionService,
              private offersService : OffersService,
              private zone: NgZone,
              private router: Router,
              private environmentService: EnvironmentService,
              private _loader: MapsAPILoader) {

    this.currentUser = this.sharedService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    } else {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
      this.getUserInfos();
      if (this.isNewUser) {
        this.initForm();
      }
      if (!this.isRecruiter && !this.isEmployer) {
        this.personalAddressLabel = "personnelle";
        this.jobAddressLabel = "Adresse de départ au travail";
        listService.loadNationalities().then((response: any) => {
          this.nationalities = response.data;
          this.dataForNationalitySelectReady = true;
          if (this.isFrench || this.isEuropean == 0) {
            this.scanTitle = " de votre CNI ou Passeport";
          }
          if (this.isEuropean == 1) {
            this.scanTitle = " de votre titre de séjour";
          }
          this.loadAttachement(this.scanTitle);
        });

      } else {
        this.scanTitle = " de votre extrait k-bis";
        this.loadAttachement(this.scanTitle);
        listService.loadConventions().then((response: any) => {
          this.conventions = response;
        });
      }
    }
    this.isFrench = true;

    //load countries list
    this.listService.loadCountries("jobyer").then((data: any) => {
      this.pays = data.data;
    });
    //loadQualities
    this.qualities = this.sharedService.getOwnQualityList();
    if (!this.qualities || this.qualities.length == 0) {
      let role = this.projectTarget != "jobyer" ? "employeur" : 'jobyer'
      this.listService.loadQualities(this.projectTarget, role).then((data: any) => {
        this.qualities = data.data;
        this.sharedService.setOwnQualityList(this.qualities);
      })
    }

    //loadLanguages
    this.languages = this.sharedService.getLangList();
    if (!this.languages || this.languages.length == 0) {
      this.listService.loadLanguages().then((data: any) => {
        this.languages = data.data;
        this.sharedService.setLangList(this.languages);
      })
    }

    //load Softwares for jobyers pharmaciens
    this.listService.loadPharmacieSoftwares().then((data: any) => {
      this.softwares = data.data;
    })

    this.allImages = [];

    this.datepickerOpts = {
      language:'fr-FR',
      startDate: new Date(),
      autoclose: true,
      todayHighlight: true,
      format: 'dd/mm/yyyy'
    };
    this.dispoToCreate = {

      startDate : 0,
      endDate : 0,
      startHour : 0,
      endHour : 0
    };
    if(!this.isEmployer && !this.isRecruiter){
      this.initDisponibilites();
      this.initRequirements();
      this.initinterestingJobs();
    }

  }

  initinterestingJobs(){
    this.profileService.loadProfileJobs(this.currentUser.jobyer.id).then((data:any)=>{
      this.interestingJobs = data;
    });
  }

  addJob(){
    if(!this.selectedJob || Utils.isEmpty(this.selectedJob) ||
      !this.selectedJobLevel || Utils.isEmpty(this.selectedJobLevel)){
      return;
    }
    for(let i = 0 ; i < this.interestingJobs.length ; i++){
      if(this.interestingJobs[i].libelle == this.selectedJob){
        return;
      }
    }
    let j = {
      id : this.selectedJobId,
      libelle : this.selectedJob,
      niveau : this.selectedJobLevel
    };
    this.interestingJobs.push(j);
    this.profileService.attachJob(j, this.currentUser.jobyer.id).then((data: any)=> {
      // Refresh environment
      this.environmentService.reload();
    });
  }

  removeJob(j){
    let index = -1;
    for(let i = 0 ; i < this.interestingJobs.length ; i++){
      if(this.interestingJobs[i].id == j.id){
        index = i;
        break;
      }
    }

    if(index<0)
      return;

    this.interestingJobs.splice(index,1);
    this.profileService.removeJob(j, this.currentUser.jobyer.id).then((data: any)=> {
      // Refresh environment
      this.environmentService.reload();
    });
  }

  initRequirements(){

    let offers = this.currentUser.jobyer.offers;
    for(let i = 0 ;i < offers.length ; i++){
      let jd = offers[i].jobData;
      let found = false;

      for ( let j = 0 ; j < this.jobs.length ; j++)
        if(this.jobs[j].id == jd.idJob){
          found= true;
          break;
        }

      if(found)
        continue;

      this.jobs.push({
        id : jd.idJob,
        libelle : jd.job,
        requirements : []
      });
    }

    for(let i = 0 ; i < this.jobs.length ; i++)
      this.profileService.loadRequirementsByJob(this.jobs[i].id).then((data:any)=>{
        this.jobs[i].requirements = data;
      });
  }

  getUserFullname() {
    this.currentUserFullname = (this.currentUser.prenom + " " + this.currentUser.nom).trim();
  }

  getUserInfos() {
    this.getUserFullname();
    this.phoneNumber = this.currentUser.tel;
    this.email = this.currentUser.email;
    this.isNewUser = this.currentUser.newAccount;
    this.showForm = this.isNewUser ? true : false;
    this.isEmployer = this.currentUser.estEmployeur;
    this.isRecruiter = this.currentUser.estRecruteur;
    this.accountId = this.currentUser.id;
    this.userRoleId = this.projectTarget == "employer" ? this.currentUser.employer.id : this.currentUser.jobyer.id;

    if (this.projectTarget == 'employer') {
      let id = this.currentUser.employer.entreprises[0].id;
      this.profileService.getEmployerOfferStats(id).then((data: any) => {
        this.offerStats = data;
      });
      this.profileService.getEmployerMissionStats(id).then((data: any) => {
        this.missionStats = data;
      });
    }

    if(!this.isRecruiter) {
      //get user qualities
      let id = this.currentUser.estEmployeur ? this.currentUser.employer.entreprises[0].id : this.currentUser.jobyer.id;
      this.profileService.getUserQualities(id, this.projectTarget).then((data: any) => {
        if (data) {
          this.savedQualities = data;
        }
      });

      this.profileService.getUserLanguages(id, this.projectTarget).then((data: any) => {
        if (data) {
          this.savedLanguages = data;
        }
      });
    }
    //cv && nb work and study hours
    if(this.projectTarget == 'jobyer'){
      this.cv = this.currentUser.jobyer.cv;
      this.nbWorkHours = this.currentUser.jobyer.nbWorkHours;
      this.nbWorkVitOnJob = this.currentUser.jobyer.nbVitOnJobHours/60;
      this.isNbStudyHoursBig = this.currentUser.jobyer.nbStudyHoursBig;

      // get mastered softwares for jobyers pharmaciens
      this.profileService.getUserSoftwares(this.currentUser.jobyer.id).then((data: any) => {
        if (data) {
          this.savedSoftwares = data;
        }
      });
    }
  }

  /**
   * Define initial required fields
   */
  initValidation() {

    // Required field for all roles
    this.isValidLastname = Utils.isEmpty(this.lastname) ? false : true;
    this.isValidFirstname = Utils.isEmpty(this.firstname) ? false : true;

    // Required fields for employer
    if (this.isEmployer) {
      this.isValidApe = Utils.isEmpty(this.ape) ? false : true;
      this.isValidCompanyname = Utils.isEmpty(this.companyname) ? false : true;
      this.isValidConventionId = Utils.isEmpty(this.conventionId) ? false : true;
    }
  }

  watchPersonalAddress(e) {
    let _address = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    this.namePA = _address;
    this.streetNumberPA = "";
    this.streetPA = "";
    this.zipCodePA = "";
    this.cityPA = "";
    this.countryPA = "";

    this.personalAddress = _address;
    this.isValidPersonalAddress = _isValid;
    //console.log();
    this.isValidForm();
  }

  watchJobAddress(e) {
    let _address = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    this.nameJA = _address;
    this.streetNumberJA = "";
    this.streetJA = "";
    this.zipCodeJA = "";
    this.cityJA = "";
    this.countryJA = "";

    this.jobAddress = _address;
    this.isValidJobAddress = _isValid;
    //console.log();
    this.isValidForm();
  }

  watchCorrespondenceAddress(e) {
    let _address = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    this.nameCA = _address;
    this.streetNumberCA = "";
    this.streetCA = "";
    this.zipCodeCA = "";
    this.cityCA = "";
    this.countryCA = "";

    this.correspondenceAddress = _address;
    this.isValidCorrespondenceAddress = _isValid;
    //console.log();
    this.isValidForm();
  }

  autocompletePersonalAddress() {
    this._loader.load().then(() => {
      //let autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompletePersonal"), {});
      google.maps.event.addListener(this.autocompletePA, 'place_changed', () => {
        let place = this.autocompletePA.getPlace();
        var addressObj = AddressUtils.decorticateGeolocAddress(place);

        this.personalAddress = place['formatted_address'];
        this.zone.run(()=> {
          this.namePA = !addressObj.name ? '' : addressObj.name.replace("&#39;", "'");
          this.streetNumberPA = addressObj.streetNumber.replace("&#39;", "'");
          this.streetPA = addressObj.street.replace("&#39;", "'");
          this.zipCodePA = addressObj.zipCode;
          this.cityPA = addressObj.city.replace("&#39;", "'");
          this.countryPA = (addressObj.country.replace("&#39;", "'") == "" ? 'France' : addressObj.country.replace("&#39;", "'"));

          this.isValidPersonalAddress = true;
          this.isValidForm();
        });
      });
    });
  }

  autocompleteJobAddress() {
    this._loader.load().then(() => {
      //let autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompleteJob"), {});
      google.maps.event.addListener(this.autocompleteJA, 'place_changed', () => {
        let place = this.autocompleteJA.getPlace();
        var addressObj = AddressUtils.decorticateGeolocAddress(place);

        this.jobAddress = place['formatted_address'];
        this.zone.run(()=> {
          this.nameJA = !addressObj.name ? '' : addressObj.name.replace("&#39;", "'");
          this.streetNumberJA = addressObj.streetNumber.replace("&#39;", "'");
          this.streetJA = addressObj.street.replace("&#39;", "'");
          this.zipCodeJA = addressObj.zipCode;
          this.cityJA = addressObj.city.replace("&#39;", "'");
          this.countryJA = (addressObj.country.replace("&#39;", "'") == "" ? 'France' : addressObj.country.replace("&#39;", "'"));

          this.isValidJobAddress = true;
          this.isValidForm();
        });
      });
    });
  }

  autocompleteCorrespondenceAddress() {
    this._loader.load().then(() => {
      //let autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompleteJob"), {});
      google.maps.event.addListener(this.autocompleteCA, 'place_changed', () => {
        let place = this.autocompleteCA.getPlace();
        var addressObj = AddressUtils.decorticateGeolocAddress(place);

        this.correspondenceAddress = place['formatted_address'];
        this.zone.run(()=> {
          this.nameCA = !addressObj.name ? '' : addressObj.name.replace("&#39;", "'");
          this.streetNumberCA = addressObj.streetNumber.replace("&#39;", "'");
          this.streetCA = addressObj.street.replace("&#39;", "'");
          this.zipCodeCA = addressObj.zipCode;
          this.cityCA = addressObj.city.replace("&#39;", "'");
          this.countryCA = (addressObj.country.replace("&#39;", "'") == "" ? 'France' : addressObj.country.replace("&#39;", "'"));

          this.isValidCorrespondenceAddress = true;
          this.isValidForm();
        });
      });
    });
  }

  formHasChanges() {
    if (this.showForm) {
      return true;
    }
    return false;
  }

  loadAttachement(scanTitle) {
    // Get scan
    this.attachementsService.loadAttachements(this.currentUser, 'Scans').then((attachments: any) => {
      let allImagesTmp = [];
      for (let i = 0; i < attachments.length; ++i) {
        if (attachments[i].fileName.substr(0, 4 + scanTitle.length) == "scan" + scanTitle) {
          this.attachementsService.downloadActualFile(attachments[i].id, attachments[i].fileName).then((data: any)=> {
            allImagesTmp.push({
              data: data.stream
            });
          });
        }
      }
      this.allImages = allImagesTmp;
    });
  }

  /**
   * Initialize form with user values
   */
  initForm() {

    this.showForm = true;
    var offset = jQuery("#profileForm").offset().top;
    var point = offset+window.innerHeight-50;

    this.title = !this.currentUser.titre ? "M." : this.currentUser.titre;
    jQuery('.titleSelectPicker').selectpicker('val', this.title);
    this.lastname = this.currentUser.nom;
    this.firstname = this.currentUser.prenom;

    let role = this.isEmployer ? 'employeur' : 'jobyer';
    let field = 'scan';
    let userId = this.isEmployer ? this.currentUser.employer.id : this.currentUser.jobyer.id;

    var elements = [];
    jQuery("div[id^='q-datepicker_']").each(function () {
      elements.push(this.id);
    });

     if (!this.isEmployer && !this.isNewUser)
      this.profileService.loadAdditionalUserInformations(this.currentUser.jobyer.id).then((data: any) => {
        data = data.data[0];
        if (!Utils.isEmpty(data.fk_user_pays)) {
          this.index = this.profileService.getCountryById(data.fk_user_pays, this.pays).indicatif_telephonique;
        }
        this.regionId = data.fk_user_identifiants_nationalite;

        this.dateStay = data.date_de_delivrance;
        var dateStay = Utils.isEmpty(this.dateStay) ? "":moment(this.dateStay).format("DD/MM/YYYY");
        jQuery('#' + elements[1]).datepicker('update',dateStay );

        this.dateFromStay = data.debut_validite;
        var dateFromStay = Utils.isEmpty(this.dateFromStay) ? "":moment(this.dateFromStay).format("DD/MM/YYYY");
        jQuery('#' + elements[2]).datepicker('update',dateFromStay );

        this.dateToStay = data.fin_validite;
        var dateToStay = Utils.isEmpty(this.dateToStay) ? "":moment(this.dateToStay).format("DD/MM/YYYY");
        jQuery('#' + elements[3]).datepicker('update',dateToStay );


        if (this.index == 33) {
          this.isFrench = true;
          this.isCIN = true;
          this.birthdepId = data.fk_user_departement;
          // this.birthdep = "71";
        } else {
          this.isFrench = false;
        }
        if (this.regionId == '42') {
          this.isEuropean = 1;
          this.isResident = (data.est_resident == 'Oui' ? true : false);
          this.whoDeliverStay = data.instance_delivrance;
          this.numStay = !Utils.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
          this.nationalityId = data.fk_user_nationalite;
          this.isCIN = false;
        } else {
          this.regionId = '41'
          this.isEuropean = 0;
          this.isCIN = !Utils.isEmpty(data.numero_titre_sejour) ? false : true;
          this.numStay = !Utils.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
        }

        if (!Utils.isEmpty(this.birthdepId)) {
          this.communesService.getDepartmentById(this.birthdepId).then((res: any) => {
            if (res && res.data.length > 0) {
              this.selectedDep = res.data[0];
              jQuery(".dep-select").select2('data', this.selectedDep);
            } else {
              this.selectedDep = {id: '0', nom: "", numero: ""};
              jQuery(".dep-select").select2('data', this.selectedDep);
            }
          });
        }
      });


    if (!this.isRecruiter) {
      if (this.isEmployer && this.currentUser.employer.entreprises.length != 0) {
        this.companyname = this.currentUser.employer.entreprises[0].nom;
        this.siret = this.currentUser.employer.entreprises[0].siret;
        this.ape = this.currentUser.employer.entreprises[0].naf;

        this.conventionService.loadConventionData(this.currentUser.employer.id).then((data: any)=>{
          if (data.length > 0) {
            this.collective_heure_hebdo = Number(data[0].duree_collective_travail_hebdo);
          } else {
            this.collective_heure_hebdo = 35;
          }
        });

        if (this.currentUser.employer.entreprises[0].conventionCollective &&
          this.currentUser.employer.entreprises[0].conventionCollective.id > 0) {
          this.conventionId = this.currentUser.employer.entreprises[0].conventionCollective.id;
        }
        this.medecineService.getMedecine(this.currentUser.employer.entreprises[0].id).then((res: any)=> {
          if (res && res != null) {
            this.selectedMedecine = {id: res.id, libelle: res.libelle};
            jQuery(".medecine-select").select2('data', this.selectedMedecine);
          }
        });

        //get Personal Address
        var entreprise = this.currentUser.employer.entreprises[0];
        this.personalAddress = entreprise.siegeAdress.fullAdress;
        this.namePA = entreprise.siegeAdress.name;
        this.streetNumberPA = entreprise.siegeAdress.streetNumber;
        this.streetPA = entreprise.siegeAdress.street;
        this.zipCodePA = entreprise.siegeAdress.zipCode;
        this.cityPA = entreprise.siegeAdress.city;
        this.countryPA = entreprise.siegeAdress.country;

        if (!this.countryPA && this.personalAddress) {
          this.profileService.getAddressByUser(entreprise.id, 'employer').then((data) => {
            this.namePA = data[0].name;
            this.streetNumberPA = data[0].streetNumber;
            this.streetPA = data[0].street;
            this.zipCodePA = data[0].zipCode;
            this.cityPA = data[0].city;
            this.countryPA = data[0].country;
          });
        }
        this.isValidPersonalAddress = true;

        //get Job Address
        this.jobAddress = entreprise.workAdress.fullAdress;
        this.nameJA = entreprise.workAdress.name;
        this.streetNumberJA = entreprise.workAdress.streetNumber;
        this.streetJA = entreprise.workAdress.street;
        this.zipCodeJA = entreprise.workAdress.zipCode;
        this.cityJA = entreprise.workAdress.city;
        this.countryJA = entreprise.workAdress.country;

        if (!this.countryPA && this.jobAddress) {
          this.profileService.getAddressByUser(entreprise.id, 'employer').then((data) => {
            this.nameJA = data[1].name;
            this.streetNumberJA = data[1].streetNumber;
            this.streetJA = data[1].street;
            this.zipCodeJA = data[1].zipCode;
            this.cityJA = data[1].city;
            this.countryJA = data[1].country;
          });
        }
        this.isValidJobAddress = true;

        //get Correspondence Address
        this.correspondenceAddress = entreprise.correspondanceAdress.fullAdress;
        this.nameCA = entreprise.correspondanceAdress.name;
        this.streetNumberCA = entreprise.correspondanceAdress.streetNumber;
        this.streetCA = entreprise.correspondanceAdress.street;
        this.zipCodeCA = entreprise.correspondanceAdress.zipCode;
        this.cityCA = entreprise.correspondanceAdress.city;
        this.countryCA = entreprise.correspondanceAdress.country;

        if (!this.countryPA && this.jobAddress) {
          this.profileService.getAddressByUser(entreprise.id, 'employer').then((data) => {
            this.nameCA = data[2].name;
            this.streetNumberCA = data[2].streetNumber;
            this.streetCA = data[2].street;
            this.zipCodeCA = data[2].zipCode;
            this.cityCA = data[2].city;
            this.countryCA = data[2].country;
          });
        }
        this.isValidCorrespondenceAddress = true;

      } else {
        if (this.currentUser.jobyer.dateNaissance) {
          this.birthdate = moment(new Date(this.currentUser.jobyer.dateNaissance)).format('DD/MM/YYYY');
          this.birthdateHidden = new Date(this.currentUser.jobyer.dateNaissance);
          this.isValidBirthdate = true;
          jQuery('#' + elements[0]).datepicker('update', this.birthdate);
        } else {
          this.birthdate = null;
          this.birthdateHidden = null;
          this.isValidBirthdate = true;
        }
        var _birthplace = this.currentUser.jobyer.lieuNaissance;
        if (_birthplace !== null) {
          this.communesService.getCommune(_birthplace).then((res: any) => {

            if (res && res.length > 0) {
              this.selectedCommune = res[0];
              jQuery(".commune-select").select2('data', this.selectedCommune);
              if (this.selectedCommune.fk_user_code_postal && this.selectedCommune.fk_user_code_postal != "null") {
                this.selectedCP = parseInt(this.selectedCommune.fk_user_code_postal);
                this.birthcp = this.selectedCommune.code;
                jQuery(".cp-select").select2('data', {id: this.selectedCP, code: this.birthcp});
              } else {
                this.selectedCP = 0;
                this.birthcp = '';
                jQuery(".cp-select").select2('data', {id: this.selectedCP, code: this.birthcp});
              }
            } else {
              this.selectedCommune = {id: '0', nom: _birthplace, code_insee: '0'};
              jQuery(".commune-select").select2('data', this.selectedCommune);
            }
            this.isValidNumSS = true;
          });
        }

        //this.selectedCommune = {id:0, nom: this.currentUser.jobyer.lieuNaissance, code_insee: ''}
        this.isValidNumSS = true;
        this.cni = this.currentUser.jobyer.cni;
        this.numSS = this.currentUser.jobyer.numSS;
        this.nationalityId = this.currentUser.jobyer.natId == 0 ? "91" : this.currentUser.jobyer.natId;
        jQuery('.nationalitySelectPicker').selectpicker('val', this.nationalityId);

        this.isValidCni = true;

        // get Personal Address
        var jobyer = this.currentUser.jobyer;
        this.personalAddress = jobyer.personnalAdress.fullAdress;
        this.namePA = jobyer.personnalAdress.name;
        this.streetNumberPA = jobyer.personnalAdress.streetNumber;
        this.streetPA = jobyer.personnalAdress.street;
        this.zipCodePA = jobyer.personnalAdress.zipCode;
        this.cityPA = jobyer.personnalAdress.city;
        this.countryPA = jobyer.personnalAdress.country;
        if (!this.countryPA && this.personalAddress) {
          this.profileService.getAddressByUser(jobyer.id, 'jobyer').then((data) => {
            this.namePA = data[0].name;
            this.streetNumberPA = data[0].streetNumber;
            this.streetPA = data[0].street;
            this.zipCodePA = data[0].zipCode;
            this.cityPA = data[0].city;
            this.countryPA = data[0].country;
          });
        }

        this.isValidPersonalAddress = true;
        this.jobAddress = this.currentUser.jobyer.workAdress.fullAdress;
        this.nameJA = this.currentUser.jobyer.workAdress.name;
        this.streetNumberJA = this.currentUser.jobyer.workAdress.streetNumber;
        this.streetJA = this.currentUser.jobyer.workAdress.street;
        this.zipCodeJA = this.currentUser.jobyer.workAdress.zipCode;
        this.cityJA = this.currentUser.jobyer.workAdress.city;
        this.countryJA = this.currentUser.jobyer.workAdress.country;
        if (!this.countryJA && this.jobAddress) {
          this.profileService.getAddressByUser(this.currentUser.jobyer.id, 'jobyer').then((data) => {
            this.nameJA = data[1].name;
            this.streetNumberJA = data[1].streetNumber;
            this.streetJA = data[1].street;
            this.zipCodeJA = data[1].zipCode;
            this.cityJA = data[1].city;
            this.countryJA = data[1].country;
          });
        }
        this.isValidJobAddress = true;
      }

    }

    this.profileService.getPrefecture(this.whoDeliverStay).then((data: any) => {
      if (data && data.status == "success" && data.data && data.data.length != 0)
        jQuery(".whoDeliver-select").select2('data', {id: data.data[0].id, nom: this.whoDeliverStay});
    });


    if (!this.isEmployer && !this.isRecruiter) {
      this.selectedJobLevel = '1';
      let self = this;
      let job = jQuery('.job-select').select2({
        maximumSelectionLength: 1,
        tokenSeparators: [",", " "],
        createSearchChoice: function (term, data) {
          if (self.jobsList.length == 0) {
            return {
              id: '0', libelle: term
            };
          }
        },
        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          transport: function (params) {
            params.beforeSend = Configs.getSelect2TextHeaders();
            return jQuery.ajax(params);
          },
          data: function (term, page) {
            return self.offersService.selectJobs(term, 0);
          },
          results: function (data, page) {
            self.jobsList = data.data;
            return {results: data.data};
          },
          cache: false,

        },

        formatResult: function (item) {
          return item.libelle;
        },
        formatSelection: function (item) {
          return item.libelle;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 1,
        initSelection: function(element, callback) {
        }
      });

      job
        .val(this.selectedJob).trigger("change")
        .on("change", function (e) {
            self.jobSelected(e.val);
          }
        );

    }



    this.initValidation();
    //$( "#profileForm" ).scrollTop( 300 );
    window.setTimeout(function(){
      window.scrollTo(0,point);
    }, 1000);

  }

  jobSelected(idJob){
    if(Utils.isEmpty(idJob))
      return;

    this.selectedJobId = idJob;
    var jobsTemp = this.jobsList.filter((v) => {
      return (v.id == idJob);
    });
    this.selectedJob = jobsTemp[0].libelle;
  }

  updateScan(accountId, userId, role) {
    if (this.allImages && this.allImages.length > 0) {
      if (accountId) {
        for (let i = 0; i < this.allImages.length; i++) {
          let index = i + 1;
          this.attachementsService.uploadFile(this.currentUser, 'scan' + this.scanTitle + ' ' + index, this.allImages[i].data, 'Scans').then((data: any) => {
            if (data && data.id != 0) {
              this.attachementsService.uploadActualFile(data.id, data.fileName, this.allImages[i].data);
            }
          });
        }
      }
      this.currentUser.scanUploaded = false;
      this.sharedService.setCurrentUser(this.currentUser);
    }
  }

  ngOnInit(): void{

  }

  ngAfterViewChecked() {

    if (!this.isEmployer) {
      if (this.dataForNationalitySelectReady) {
        jQuery('.nationalitySelectPicker').selectpicker();
      }
    }
  }

  deleteImage(index) {
    this.allImages.splice(index, 1);
  }

  appendImg() {
    ////console.log(this.scanData)
    this.allImages.push({
      data: this.scanData
    });

    this.scanData = '';
    jQuery('.fileinput').fileinput('clear');
  }

  ngAfterViewInit(): void {
    var self = this;
    this._loader.load().then(() => {
      this.autocompletePA = new google.maps.places.Autocomplete(document.getElementById("autocompletePersonal"), this.addressOptions);
      this.autocompleteJA = new google.maps.places.Autocomplete(document.getElementById("autocompleteJob"), this.addressOptions);
      this.autocompleteCA = new google.maps.places.Autocomplete(document.getElementById("autocompleteCorrespondence"), this.addressOptions);
    });

    jQuery('.titleSelectPicker').selectpicker();
    jQuery(document).ready(function () {
      jQuery('.fileinput').on('change.bs.fileinput', function (e, file) {
        if (file === undefined) {
          Messenger().post({
            message: "Le fichier séléctionné n'est pas un fichier Image valide.",
            type: 'error',
            showCloseButton: true
          });
          jQuery('.fileinput').fileinput('clear');
        } else {
          self.scanData = file.result;
        }


      });
    });

    if (!this.isRecruiter && !this.isEmployer) {
      var self = this;
      jQuery('.dep-select').select2({
        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          transport: function (params) {
            params.beforeSend = Configs.getSelect2TextHeaders();
            return jQuery.ajax(params);
          },
          data: this.communesService.getDepartmentsByTerm(),
          results: function (data, page) {
            return {results: data.data};
          },
          cache: true
        },

        formatResult: function (item) {
          return item.numero;
        },
        formatSelection: function (item) {
          return item.numero;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 1,
      });
      jQuery('.dep-select').on('change',
        (e) => {
          self.birthdep = e.added.numero;
          self.birthdepId = e.added.id;
          jQuery('.commune-select').select2("val", "");
        }
      );
      /*jQuery(".dep-select").select2();
       jQuery('.dep-select').on('select2-selecting',
       (e) =>{
       jQuery('.commune-select').select2("val", "");
       }
       )*/
      /*jQuery('.cp-select').select2({
       ajax: {
       url: Configs.sqlURL,
       type: 'POST',
       dataType: 'json',
       quietMillis: 250,
       params: {
       contentType: "text/plain",
       },
       data: this.communesService.getCodesPostauxByTerm(),
       results: function(data, page){
       return {results: data.data};
       },
       cache: true
       },

       formatResult: function(item){
       return item.code;
       },
       formatSelection: function(item){
       return item.code;
       },
       dropdownCssClass: "bigdrop",
       escapeMarkup: function(markup){
       return markup;
       },
       minimumInputLength: 4,
       });
       jQuery('.cp-select').on('change',
       (e) =>{
       self.birthcp = e.added.code;
       self.selectedCP = e.added.id;
       self.selectedCommune = null;
       }
       );*/

      var val = ""
      jQuery('.commune-select').select2({
        maximumSelectionLength: 1,
        tokenSeparators: [",", " "],
        createSearchChoice: function (term, data) {
          if (self.communesData.length == 0) {
            return {
              id: '0', nom: term, code_insee: "0"
            };
          }
        },
        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          transport: function (params) {
            params.beforeSend = Configs.getSelect2TextHeaders();
            return jQuery.ajax(params);
          },
          data: function (term, page) {
            //return self.communesService.getCommunesByTerm(term,self.selectedCP);
            return self.communesService.getCommunesByTerm(term, self.birthdep);
          },
          results: function (data, page) {
            self.communesData = data.data;
            return {results: data.data};
          },
          cache: false,

        },

        formatResult: function (item) {
          return item.nom;
        },
        formatSelection: function (item) {
          return item.nom;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 1,
      });

      jQuery('.commune-select').on('select2-selecting',
        (e) => {
          self.selectedCommune = e.choice;
        }
      )
    }

    if (!this.isRecruiter && this.isEmployer) {
      jQuery('.medecine-select').select2({

        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          transport: function (params) {
            params.beforeSend = Configs.getSelect2TextHeaders();
            return jQuery.ajax(params);
          },
          data: this.medecineService.getMedecineByTerm(),
          results: function (data, page) {
            return {results: data.data};
          },
          cache: true
        },
        formatResult: function (item) {
          return item.libelle;
        },
        formatSelection: function (item) {
          return item.libelle;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 3,
      });
      jQuery('.medecine-select').on('change',
        (e) => {
          self.selectedMedecine = e.added;
        }
      );
    }

    if (!this.isEmployer) {
      jQuery('.whoDeliver-select').select2({

        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          transport: function (params) {
            params.beforeSend = Configs.getSelect2TextHeaders();
            return jQuery.ajax(params);
          },
          data: this.communesService.getPrefecturesByTerm(),
          results: function (data, page) {
            return {results: data.data};
          },
          cache: true
        },
        formatResult: function (item) {
          return item.nom;
        },
        formatSelection: function (item) {
          return item.nom;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 3,
      });
      jQuery('.whoDeliver-select').on('change',
        (e) => {
          self.whoDeliverStay = e.added.nom;
        }
      );
    }

  }

  isValidForm() {
    var _isFormValid = false;
    if (this.isRecruiter) {
      if (this.isValidFirstname && this.isValidLastname) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else if (this.isEmployer) {
      if (this.isValidFirstname && this.isValidLastname && this.isValidCompanyname && this.isValidSiret && this.isValidApe && this.isValidPersonalAddress && this.isValidJobAddress && this.isValidCorrespondenceAddress && !Utils.isEmpty(this.conventionId)) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else {
      if (this.isValidFirstname && this.isValidLastname && this.isValidNumSS && this.isValidBirthdate && this.isValidPersonalAddress && this.isValidJobAddress) {
        if (this.isFrench || this.isEuropean == 0) {
          if (this.isValidCni) {
            _isFormValid = true;
          } else {
            _isFormValid = false;
          }
        } else {
          _isFormValid = true;
        }
      } else {
        _isFormValid = false;
      }
    }
    return _isFormValid;
  }

  IsCompanyExist(e, field) {
    //verify if company exists
    if (field == "companyname") {
      this.profileService.countEntreprisesByRaisonSocial(this.companyname).then((res: any) => {
        if (res.data[0].count != 0 && this.companyname.toUpperCase() != this.currentUser.employer.entreprises[0].nom.toUpperCase()) {
          if (!Utils.isEmpty(this.companyname)) {
            this.companyAlert = "L'entreprise " + this.companyname + " existe déjà. Veuillez saisir une autre raison sociale.";
            this.showCurrentCompanyBtn = true;
            // this.companyname = this.currentUser.employer.entreprises[0].nom;
          }
        } else {
          this.companyAlert = "";
          this.showCurrentCompanyBtn = false;
          //console.log()
          return;
        }
      })
    } else {
      this.profileService.countEntreprisesBySIRET(this.siret).then((res: any) => {
        if (res.data[0].count != 0 && this.siret != this.currentUser.employer.entreprises[0].siret) {
          if (!Utils.isEmpty(this.currentUser.employer.entreprises[0].nom)) {
            this.siretAlert = "Le SIRET " + this.siret + " existe déjà. Veuillez en saisir un autre.";
            this.showCurrentSiretBtn = true;
            //this.siret = this.currentUser.employer.entreprises[0].siret;
          } else {
            this.siretAlert = this.companyInfosAlert('siret');
            this.showCurrentSiretBtn = false;
          }
        } else {
          this.siretAlert = "";
          this.showCurrentSiretBtn = false;
          //console.log()
          return;
        }
      })
    }
  }

  companyInfosAlert(field) {
    var message = (field == "siret" ? ("Le SIRET " + this.siret) : ("La raison sociale " + this.companyname)) + " existe déjà. Si vous continuez, ce compte sera bloqué, \n sinon veuillez en saisir " + (field == "siret" ? "un " : "une ") + "autre. \n Voulez vous continuez?";
    return message;
  }

  focus(field) {
    if (field == 'companyname') {
      jQuery('#companyname').focus()
    } else if (field == 'siret') {
      jQuery('#siret').focus()
    }
  }

  setDefaultValue(field) {
    if (field == 'companyname') {
      this.companyname = this.currentUser.employer.entreprises[0].nom;
      this.companyAlert = "";
      this.showCurrentCompanyBtn = false;
    } else if (field == 'siret') {
      this.siret = this.currentUser.employer.entreprises[0].siret;
      this.siretAlert = "";
      this.showCurrentSiretBtn = false;
    }
    //console.log()
  }

  closeForm() {
    this.showForm = false;
  }

  updateCivility() {
    if (this.isValidForm()) {
      this.validation = true;
      var title = this.title;
      var firstname = this.firstname;
      var lastname = this.lastname;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;
      var isNewUser = this.isNewUser;

      if (this.isEmployer) {
        if (this.isRecruiter) {
          this.profileService.updateRecruiterCivility(title, lastname, firstname, accountId)
            .then((res: any) => {
              //case of update failure : server unavailable or connection problem
              if (!res || res.status == "failure") {
                Messenger().post({
                  message: 'Serveur non disponible ou problème de connexion',
                  type: 'error',
                  showCloseButton: true
                });
                this.validation = false;
                return;
              } else {
                // //console.log("response update civility : " + res.status);
                this.currentUser.titre = this.title;
                this.currentUser.nom = this.lastname;
                this.currentUser.prenom = this.firstname;
                this.currentUser.newAccount = false;
                this.sharedService.setCurrentUser(this.currentUser);
                this.getUserFullname();

                this.validation = false;
                Messenger().post({
                  message: 'Vos données ont été bien enregistrées',
                  type: 'success',
                  showCloseButton: true
                });
                this.showForm = false;
                //redirecting to home page if new User
                if (isNewUser) {
                  this.router.navigate(['home']);
                }

              }

            })
            .catch((error: any) => {
              // //console.log(error);
              this.validation = false;
            });

        } else {
          var companyname = this.companyname;
          var siret = this.siret.substring(0, 17);
          var ape = this.ape.substring(0, 5).toUpperCase();
          var medecineId = this.selectedMedecine.id === "0" ? 0 : parseInt(this.selectedMedecine.id);
          var entrepriseId = this.currentUser.employer.entreprises[0].id;

          this.profileService.updateEmployerCivility(title, lastname, firstname, companyname, siret, ape, userRoleId, entrepriseId, medecineId, this.conventionId, this.collective_heure_hebdo, false)
            .then((res: any) => {

              //case of update failure : server unavailable or connection problem
              if (!res || res.status == "failure") {
                Messenger().post({
                  message: 'Serveur non disponible ou problème de connexion',
                  type: 'error',
                  showCloseButton: true
                });
                this.validation = false;
                return;
              } else {
                // data saved
                // //console.log("response update civility : " + res.status);
                this.currentUser.titre = this.title;
                this.currentUser.nom = this.lastname;
                this.currentUser.prenom = this.firstname;
                this.currentUser.employer.entreprises[0].nom = this.companyname;
                this.currentUser.employer.entreprises[0].siret = siret;
                this.currentUser.employer.entreprises[0].naf = ape;
                this.currentUser.isNewUser
                this.currentUser.newAccount = false;
                let code = '';
                let libelle = '';
                if (this.conventionId && this.conventionId > 0) {
                  for (let i = 0; i < this.conventions.length; i++)
                    if (this.conventions[i].id == this.conventionId) {
                      code = this.conventions[i].code;
                      libelle = this.conventions[i].libelle;
                      break;
                    }

                }

                this.currentUser.employer.entreprises[0].conventionCollective = {
                  id: this.conventionId,
                  code: code,
                  libelle: libelle
                };
                this.sharedService.setCurrentUser(this.currentUser);
                this.getUserFullname();


                //upload scan
                this.updateScan(accountId, userRoleId, 'employeur');
                this.validation = false;

                if(!Utils.isEmpty(this.personalAddress)){
                  if(Utils.isEmpty(this.jobAddress)){
                    this.jobAddress = this.personalAddress;
                    this.nameJA = this.namePA;
                    this.streetNumberJA = this.streetNumberPA;
                    this.streetJA = this.streetPA;
                    this.zipCodeJA = this.zipCodePA;
                    this.cityJA = this.cityPA;
                    this.countryJA = this.countryPA;
                  }

                  if(Utils.isEmpty(this.correspondenceAddress)){
                    this.correspondenceAddress = this.personalAddress;
                    this.nameCA = this.namePA;
                    this.streetNumberCA = this.streetNumberPA;
                    this.streetCA = this.streetPA;
                    this.zipCodeCA = this.zipCodePA;
                    this.cityCA = this.cityPA;
                    this.countryCA = this.countryPA;
                  }
                }

                if (this.isPersonalAddressModified()) {
                  this.updatePersonalAddress();
                }
                if (this.isJobAddressModified()) {
                  this.updateJobAddress();
                }

                if (this.isCorrespondenceAddressModified()) {
                  this.updateCorrespondenceAddress();
                }

                //save qualities
                this.saveQualities();
                Messenger().post({
                  message: 'Vos données ont été bien enregistrées',
                  type: 'success',
                  showCloseButton: true
                });
                this.showForm = false;
                //redirecting to home page if new User
                if (this.isNewUser) {
                  this.router.navigate(['home']);
                }
              }

            })
            .catch((error: any) => {
              this.validation = false;
              // //console.log(error);
            });
        }
      } else {
        var numSS = this.numSS;
        var cni = this.cni;
        var birthdate = "";
        if (!Utils.isEmpty(this.birthdateHidden))
          birthdate = moment(this.birthdateHidden).format('MM/DD/YYYY');
        var birthplace = this.selectedCommune.nom;
        var nationalityId = this.nationalityId;
        //var birthcp = this.birthcp;
        var birthdepId = this.birthdepId;
        var numStay = this.numStay;
        var dateStay = (!Utils.isEmpty(this.dateStay) ? moment(this.dateStay).format('MM/DD/YYYY') : null);
        var dateFromStay = (!Utils.isEmpty(this.dateFromStay) ? moment(this.dateFromStay).format('MM/DD/YYYY') : null);
        var dateToStay = (!Utils.isEmpty(this.dateToStay) ? moment(this.dateToStay).format('MM/DD/YYYY') : null);
        var isResident = (this.isResident ? 'Oui' : 'Non');
        var birthCountryId;
        if (this.index)
          birthCountryId = this.profileService.getCountryByIndex(this.index, this.pays).id;
        var prefecture = this.whoDeliverStay;
        var regionId;
        if (!this.regionId) {
          if (this.isEuropean == 1) {
            //etranger
            regionId = 42;
          } else {
            regionId = 41;
          }
        } else {
          regionId = this.regionId;
        }

        let studyHoursBigValue = (this.isNbStudyHoursBig ? "OUI" : "NON");

        this.profileService.updateJobyerCivility(title, lastname, firstname, numSS, cni, nationalityId, userRoleId, birthdate, birthdepId, birthplace, birthCountryId, numStay,
          dateStay, dateFromStay, dateToStay, isResident, prefecture, this.isFrench, this.isEuropean, regionId, this.cv, this.nbWorkHours, studyHoursBigValue)
          .then((res: any) => {

            //case of authentication failure : server unavailable or connection problem
            if (!res || res.status == "failure") {
              Messenger().post({
                message: 'Serveur non disponible ou problème de connexion',
                type: 'error',
                showCloseButton: true
              });
              this.validation = false;
              return;
            } else {
              // data saved
              this.currentUser.titre = this.title;
              this.currentUser.nom = this.lastname;
              this.currentUser.prenom = this.firstname;
              this.currentUser.jobyer.cni = this.cni;
              this.currentUser.jobyer.numSS = this.numSS;
              this.currentUser.jobyer.natId = this.nationalityId;
              this.currentUser.jobyer.dateNaissance = Date.parse(moment(this.birthdateHidden).format('MM/DD/YYYY'));
              this.currentUser.jobyer.lieuNaissance = birthplace;
              this.currentUser.newAccount = false;
              this.sharedService.setCurrentUser(this.currentUser);
              this.getUserFullname();

              //upload scan
              this.updateScan(accountId, userRoleId, "jobyer");
              this.validation = false;
              if (this.isPersonalAddressModified()) {
                this.updatePersonalAddress();
              }
              if(!Utils.isEmpty(this.personalAddress)){
                if(Utils.isEmpty(this.jobAddress)){
                  this.jobAddress = this.personalAddress;
                  this.nameJA = this.namePA;
                  this.streetNumberJA = this.streetNumberPA;
                  this.streetJA = this.streetPA;
                  this.zipCodeJA = this.zipCodePA;
                  this.cityJA = this.cityPA;
                  this.countryJA = this.countryPA;
                }
              }
              if (this.isJobAddressModified()) {
                this.updateJobAddress();
              }

              Messenger().post({
                message: 'Vos données ont été bien enregistrées',
                type: 'success',
                showCloseButton: true
              });
              this.showForm = false;

              //redirecting to home page if new User
              if (this.isNewUser) {
                this.router.navigate(['home']);
              }
            }
          })
          .catch((error: any) => {
            ////console.log(error);
            this.validation = false;
          });

        // Refresh environment
        this.environmentService.reload();

      }
    }
  }

  updatePersonalAddress() {
    if (this.isValidForm()) {
      this.validation = true;
      var street = this.streetPA;
      var streetNumber = this.streetNumberPA;
      var name = this.namePA;
      var city = this.cityPA;
      var country = this.countryPA;
      var zipCode = this.zipCodePA;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;

      if (this.isEmployer) {
        var entreprise = this.currentUser.employer.entreprises[0];
        var entrepriseId = "" + entreprise.id + "";
        // update personal address
        this.profileService.updateUserPersonalAddress(entrepriseId, name, streetNumber, street, zipCode, city, country, 'employeur')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              // //console.log(data.error);
              // //console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
              this.validation = false;
              return;
            } else {
              //id address not send by server
              entreprise.siegeAdress.id = JSON.parse(data._body).id;
              entreprise.siegeAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              entreprise.siegeAdress.name = name;
              entreprise.siegeAdress.streetNumber = streetNumber;
              entreprise.siegeAdress.street = street;
              entreprise.siegeAdress.zipCode = zipCode;
              entreprise.siegeAdress.city = city;
              entreprise.siegeAdress.country = country;
              this.currentUser.employer.entreprises[0] = entreprise;
              this.sharedService.setCurrentUser(this.currentUser);

              this.validation = false;

            }
          });
      } else {
        var roleId = "" + this.userRoleId + "";
        // update personal address
        this.profileService.updateUserPersonalAddress(roleId, name, streetNumber, street, zipCode, city, country, 'jobyer')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              // //console.log(data.error);

              // //console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
              return;
            } else {
              this.validation = false;
              //id address not send by server
              this.currentUser.jobyer.personnalAdress.id = JSON.parse(data._body).id;
              this.currentUser.jobyer.personnalAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              this.currentUser.jobyer.personnalAdress.name = name;
              this.currentUser.jobyer.personnalAdress.streetNumber = streetNumber;
              this.currentUser.jobyer.personnalAdress.street = street;
              this.currentUser.jobyer.personnalAdress.zipCode = zipCode;
              this.currentUser.jobyer.personnalAdress.city = city;
              this.currentUser.jobyer.personnalAdress.country = country;
              this.sharedService.setCurrentUser(this.currentUser);

              this.validation = false;

            }
          });
      }
    }
  }

  isPersonalAddressModified() {
    if (this.isEmployer) {
      return (this.personalAddress != this.currentUser.employer.entreprises[0].siegeAdress.fullAdress);
    } else {
      return (this.personalAddress != this.currentUser.jobyer.personnalAdress.fullAdress);
    }
  }

  isJobAddressModified() {
    if (this.isEmployer) {
      return (this.jobAddress != this.currentUser.employer.entreprises[0].workAdress.fullAdress);
    } else {
      return (this.jobAddress != this.currentUser.jobyer.workAdress.fullAdress);
    }
  }

  isCorrespondenceAddressModified() {
    if (this.isEmployer) {
      return (this.correspondenceAddress != this.currentUser.employer.entreprises[0].correspondanceAdress.fullAdress);
    }
  }

  updateJobAddress() {
    if (this.isValidForm()) {
      this.validation = true;
      var street = this.streetJA;
      var streetNumber = this.streetNumberJA;
      var name = this.nameJA;
      var city = this.cityJA;
      var country = this.countryJA;
      var zipCode = this.zipCodeJA;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;

      if (this.isEmployer) {
        var entreprise = this.currentUser.employer.entreprises[0];
        var entrepriseId = "" + entreprise.id + "";
        // update personal address
        this.profileService.updateUserJobAddress(entrepriseId, name, streetNumber, street, zipCode, city, country, 'employeur')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              // //console.log(data.error);
              // //console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
              this.validation = false;
              return;
            } else {
              //id address not send by server
              entreprise.workAdress.id = JSON.parse(data._body).id;
              entreprise.workAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              entreprise.workAdress.name = name;
              entreprise.workAdress.streetNumber = streetNumber;
              entreprise.workAdress.street = street;
              entreprise.workAdress.zipCode = zipCode;
              entreprise.workAdress.city = city;
              entreprise.workAdress.country = country;
              this.currentUser.employer.entreprises[0] = entreprise;
              this.sharedService.setCurrentUser(this.currentUser);
              this.validation = false;

            }
          });
      } else {
        var roleId = "" + this.userRoleId + "";
        // update personal address
        this.profileService.updateUserJobAddress(roleId, name, streetNumber, street, zipCode, city, country, 'jobyer')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              // //console.log(data.error);

              // //console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
              return;
            } else {
              //id address not send by server
              this.validation = false;
              this.currentUser.jobyer.workAdress.id = JSON.parse(data._body).id;
              this.currentUser.jobyer.workAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              this.currentUser.jobyer.workAdress.name = name;
              this.currentUser.jobyer.workAdress.streetNumber = streetNumber;
              this.currentUser.jobyer.workAdress.street = street;
              this.currentUser.jobyer.workAdress.zipCode = zipCode;
              this.currentUser.jobyer.workAdress.city = city;
              this.currentUser.jobyer.workAdress.country = country;
              this.sharedService.setCurrentUser(this.currentUser);

              this.validation = false;
            }
          });
      }
    }
  }

  updateCorrespondenceAddress() {
    if (this.isValidForm()) {
      this.validation = true;
      var street = this.streetCA;
      var streetNumber = this.streetNumberCA;
      var name = this.nameCA;
      var city = this.cityCA;
      var country = this.countryCA;
      var zipCode = this.zipCodeCA;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;

      if (this.isEmployer) {
        var entreprise = this.currentUser.employer.entreprises[0];
        var entrepriseId = "" + entreprise.id + "";
        // update personal address
        this.profileService.updateUserCorrespondenceAddress(entrepriseId, name, streetNumber, street, zipCode, city, country, 'employeur')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              // //console.log(data.error);
              // //console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
              this.validation = false;
              return;
            } else {
              //id address not send by server
              entreprise.correspondanceAdress.id = JSON.parse(data._body).id;
              entreprise.correspondanceAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              entreprise.correspondanceAdress.name = name;
              entreprise.correspondanceAdress.streetNumber = streetNumber;
              entreprise.correspondanceAdress.street = street;
              entreprise.correspondanceAdress.zipCode = zipCode;
              entreprise.correspondanceAdress.city = city;
              entreprise.correspondanceAdress.country = country;
              this.currentUser.employer.entreprises[0] = entreprise;
              this.sharedService.setCurrentUser(this.currentUser);
              this.validation = false;

            }
          });
      }
    }
  }

  selectNationality(e) {
    this.profileService.getIdentifiantNationalityByNationality(e.target.value).then((data: any)=> {
      this.isEuropean = data.data[0].pk_user_identifiants_nationalite == "42" ? 1 : 0;
      this.regionId = data.data[0].pk_user_identifiants_nationalite;
      if (this.isEuropean == 0) {
        this.scanTitle = " de votre CNI ou Passeport";
        this.loadAttachement(this.scanTitle);
      }
      if (this.isEuropean == 1) {
        this.scanTitle = " de votre titre de séjour";
        this.loadAttachement(this.scanTitle);
      }
    })
  }

  watchTypeDocStranger(e) {
    this.isResident = (e.target.value == '0' ? false : true);
  }

  watchTypeDoc(e) {
    this.isCIN = (e.target.value == '0' ? true : false);
  }

  selectBirthCountry(e) {
    let birthCountry = e.target.value;
    this.isFrench = birthCountry == "33" ? true : false;
    this.isCIN = this.isEuropean == 0 ? true : false;
    jQuery('.dep-select').select2("val", "");
    jQuery('.commune-select').select2("val", "");
  }

  //<editor-fold desc="Watching input functions">

  watchLastname(e) {
    let nameChecked = AccountConstraints.checkName(e, "lastname");
    this.isValidLastname = nameChecked.isValid;
    this.lastnameHint = nameChecked.hint;
    this.isValidForm();
  }

  watchFirstname(e) {
    let nameChecked = AccountConstraints.checkName(e, "firstname");
    this.isValidFirstname = nameChecked.isValid;
    this.firstnameHint = nameChecked.hint;
    this.isValidForm();
  }

  watchCompanyname(e) {
    let companynameChecked = AccountConstraints.checkCompanyName(e);
    this.isValidCompanyname = companynameChecked.isValid;
    this.companynameHint = companynameChecked.hint;
    this.isValidForm();
  }

  watchSiret(e) {
    let siretChecked = AccountConstraints.checkSiret(e);
    this.isValidSiret = siretChecked.isValid;
    this.siretHint = siretChecked.hint;
    this.isValidForm();
  }

  watchApe(e) {
    let apeChecked = AccountConstraints.checkApe(e);
    this.isValidApe = apeChecked.isValid;
    this.apeHint = apeChecked.hint;
    this.isValidForm();
  }

  /**
   * Watches National identity card / passport number
   * @param e
   */
  watchOfficialDocument(e) {
    let officialDocChecked = AccountConstraints.checkOfficialDocument(e);
    this.isValidCni = officialDocChecked.isValid;
    this.cniHint = officialDocChecked.hint;
    this.isValidForm();
  }

  watchNumSS(e) {
    let numssChecked = AccountConstraints.checkNumss(e, this.title, moment(this.birthdateHidden).format('YYYY-MM-DD'), this.selectedCommune);
    this.isValidNumSS = numssChecked.isValid;
    this.numSSHint = numssChecked.hint;
    this.isValidForm();
  }

  watchBirthdate(e) {
      let birthdateChecked = AccountConstraints.checkBirthDate(e);
      this.birthdateHidden = e;
      this.isValidBirthdate = birthdateChecked.isValid;
      this.birthdateHint = birthdateChecked.hint;
      this.isValidForm();
  }



  initDisponibilites(){

    this.profileService.loadDisponibilites(this.currentUser.jobyer.id).then((data : any)=>{
      this.disponibilites = data;
    });
  }

  addDisponibilityEntry(){
    this.profileService.saveDisponibilite(this.currentUser.jobyer.id, this.dispoToCreate).then((result:any)=>{
      if(result.status == 'success'){
        this.disponibilites.push({
          id : result.data[0].pk_user_disponibilite_du_jobyer,
          startDate : new Date(this.dispoToCreate.startDate),
          endDate : new Date(this.dispoToCreate.endDate),
          startHour : (this.dispoToCreate.startHour.getHours()*60+this.dispoToCreate.startHour.getMinutes()),
          endHour : (this.dispoToCreate.endHour.getHours()*60+this.dispoToCreate.endHour.getMinutes())
        });
        this.resetDatetime('start_date');
        this.resetDatetime('end_date');
        this.resetDatetime('start_hour');
        this.resetDatetime('end_hour');

      }
    });
  }

  resetDatetime(componentId) {
    let elements: NodeListOf<Element> = document.getElementById(componentId).getElementsByClassName('form-control');
    (<HTMLInputElement>elements[0]).value = null;
  }

  deleteDisponibilityEntry(d){

    this.profileService.deleteDisponibility(d);
    let index = -1;
    for(let i = 0 ; i < this.disponibilites.length ; i++){
      if(this.disponibilites[i].id == d.id){
        index = i;
        break;
      }
    }

    if(index>=0){
      this.disponibilites.splice(index, 1);
    }
  }

  paradox(){
    return this.dispoToCreate.endDate<this.dispoToCreate.startDate || this.dispoToCreate.endHour<this.dispoToCreate.startHour;
  }

  /**
   * @Description Converts a timeStamp to date string
   * @param time : a timestamp date
   */
  toHourString(time: number) {
    let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
    let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
    return hours + ":" + minutes;
  }

  /**
   * @Description Converts a timeStamp to date string :
   * @param date : a timestamp date
   */
  toDateString(date: number) {
    let d = new Date(date);
    let str = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    return str;
  }

  simpleDateFormat(d:Date){
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = (da < 10 ? '0' : '')+da+'/' + (m < 10 ? '0' : '') + m + "/" +d.getFullYear() ;
    return sd
  }
  simpleHourFormat(h : number){
    let s = '';
    s=s+(h/60).toFixed(0);
    s=s+':';
    s=s+(h%60);
    return s;
  }
  //</editor-fold>

  removeQuality(item) {
    this.savedQualities.splice(this.savedQualities.indexOf(item), 1);
    this.saveQualities();
  }

  addQuality() {
    if (Utils.isEmpty(this.selectedQuality)) {
      return;
    }

    var qualitiesTemp = this.qualities.filter((v)=> {
      return (v.id == this.selectedQuality);
    });
    if (this.savedQualities.indexOf(qualitiesTemp[0]) != -1) {
      return;
    }
    this.savedQualities.push(qualitiesTemp[0]);
    this.selectedQuality = "";

    this.saveQualities();
  }

  saveQualities() {
    let id = this.currentUser.estEmployeur ? this.currentUser.employer.entreprises[0].id : this.currentUser.jobyer.id;
    this.profileService.saveQualities(this.savedQualities, id, this.projectTarget);
  }

  saveLanguages() {
    let id = this.currentUser.estEmployeur ? this.currentUser.employer.entreprises[0].id : this.currentUser.jobyer.id;
    this.profileService.saveLanguages(this.savedLanguages, id, this.projectTarget);
  }

  saveSoftware(software) {
    let id = this.currentUser.jobyer.id;
    this.profileService.saveSoftware(software, id).then((expId: any) =>{
      let savedSoft = {expId:expId, softId: software.id, experience: software.experience, nom: software.nom};
      this.savedSoftwares.push(savedSoft);
    })
  }

  submitAttachement() {
    let fileField = jQuery('#cv_field');
    if (fileField && fileField[0]) {
      let fs = fileField[0].files;
      if (fs && fs.length > 0) {
        let f: any = fs[0];
        let fr = new FileReader();
        fr.onload = (file: any) => {
          let fileContent = file.target.result;
          let content = fileContent.split(',')[1];
          this.cv = f.name + ";" + content;
        }
        fr.readAsDataURL(f);
      }
    }
  }

  downloadFile(content) {
    let pureBase64 = content.split(';')[1];
	let url = "data:application/octet-stream;base64," + pureBase64;

	let downloadLink = document.createElement("a");
	downloadLink.href = url;
	//downloadLink.download = content.split(';')[0];
	downloadLink.setAttribute("download", content.split(';')[0]);
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
  }

  deleteFile() {
    this.cv = "";
  }

  watchNbStudyHours(e) {
    this.isNbStudyHoursBig = (e.target.value == '0' ? true : false);
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  openCoporamaModal() {
    jQuery("#modal-corporama-search").modal('show');
  }

  onDismissCorporamaModal(company: any) {

    if (!company) {
      return;
    }

    this.title = (company.title == "M" ? "M." : company.title);
    this.lastname = company.lastname;
    this.watchLastname({target: {value: company.lastname}});
    this.firstname = company.firstname;
    this.watchFirstname({target: {value: company.firstname}});

    if (Utils.isEmpty(company.street) === false
      && Utils.isEmpty(company.zip) === false
      && Utils.isEmpty(company.city) === false) {
      let newAdress = company.street + ', ' + company.zip + ' ' + company.city;
      if (Utils.isEmpty(this.personalAddress) === true || this.personalAddress.toUpperCase() != newAdress.toUpperCase()) {
        this.streetPA = company.street;
        this.streetNumberPA = "";
        this.namePA = "";
        this.cityPA = company.city;
        this.countryPA = "France";
        this.zipCodePA = company.zip;
        this.personalAddress = newAdress;
      }
    }

    // Call company name field watcher
    this.companyname = company.name.toUpperCase();
    this.watchCompanyname({target: {value: this.companyname}});

    this.siret = Utils.formatSIREN(company.siren);
    this.ape = company.naf;
    this.watchApe({target: {value: this.ape}});

    this.IsCompanyExist(this.companyname, 'companyname');
  }

  removeSoftware(item){
    this.savedSoftwares.splice(this.savedSoftwares.indexOf(item), 1);
    this.profileService.deleteSoftware(item.expId);
  }

  addSoftware(){
    if (Utils.isEmpty(this.selectedSoftware)) {
      return;
    }

    let softwaresTemp = this.softwares.filter((v)=> {
      return (v.id == this.selectedSoftware);
    });

    //if the selected software is already saved, do not re-add it
    for(let i = 0; i < this.savedSoftwares.length; i++) {
      if (this.savedSoftwares[i].softId == this.selectedSoftware) {
        if (this.savedSoftwares[i].experience == this.expSoftware) {
          this.selectedSoftware = "";
          this.expSoftware = -1;
          return;
        } else {
          this.profileService.updateSoftware(this.savedSoftwares[i].expId, this.expSoftware).then((data: any) => {
            this.savedSoftwares[i].experience = this.expSoftware;
            this.selectedSoftware = "";
            this.expSoftware = -1;
          });
          return;
        }
      }
    }

    //if software is not yet addes
    softwaresTemp[0].experience = this.expSoftware;
    this.saveSoftware(softwaresTemp[0]);
    this.selectedSoftware = "";
    this.expSoftware = -1;
  }
}
