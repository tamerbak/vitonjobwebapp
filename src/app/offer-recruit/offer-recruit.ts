import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {Offer} from "../../dto/offer";
import {CalendarSlot} from "../../dto/calendar-slot";
import {Loader} from "../loader/loader";
import {Calendar} from "../components/calendar/calendar";
import {OffersService} from "../../providers/offer.service";
import {LoaderService} from "../../providers/loader.service";
import {SearchService} from "../../providers/search-service";
import {SharedService} from "../../providers/shared.service";
import {ProfileService} from "../../providers/profile.service";
import {CalendarQuarterPerDay} from "../../dto/calendar-quarter-per-day";
import {RecruitmentService} from "../../providers/recruitment-service";
import {Utils} from "../utils/utils";
import {ModalTeam} from "./modal-team/modal-team";
import {DateUtils} from "../utils/date-utils";
import {ModalNotificationContract} from "../modal-notification-contract/modal-notification-contract";
import {ContractService} from "../../providers/contract-service";

declare let Messenger, jQuery: any;
declare let google: any;
declare let moment: any;
declare let require;

@Component({
  selector: '[offer-recruit]',
  template: require('./offer-recruit.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-recruit.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    AlertComponent,
    NKDatetime,
    Calendar,
    Loader,
    ModalTeam,
    ModalNotificationContract
  ],
  providers: [
    OffersService,
    SharedService,
    SearchService,
    ProfileService,
    RecruitmentService,
    ContractService
  ]
})
export class OfferRecruit {

  projectTarget: string;
  currentUser: any;

  recruitmentFinished: boolean = false;

  // The current offer
  offer: Offer;

  // Contains the list of available jobyers
  jobyers: {
    id: number,
    titre: string,
    nom: string,
    prenom: string,
    avatar: string,
    toujours_disponible: boolean,
    disponibilites: CalendarSlot[]
  }[] = [];
  currentJobyer: any = null;
  subject: string = "recruit";

  displayedHour = [];

  // Nb slot per day
  // 4 quart per hour * 24
  nbBlockPerDay = 4 * 24;
  quartersPerDay: any[] = [];

  // Contains the list of slots
  slots: any[] = [];
  employerPlanning: CalendarQuarterPerDay;
  jobyersAvailabilities: Map<number, CalendarQuarterPerDay>;
  jobyersConstraints: Map<number, CalendarQuarterPerDay>;
  jobyerHover: any;
  jobyerHoverAlwaysAvailable: boolean = false;

  planningColor: string[][] = [];
  planningColorHover: string[][] = [];
  planningJobyer: string[] = [];

  // Jobyer colors management
  jobyerColors: number[];
  jobyerColorNb: number = 1;

  // Result of the research
  searchResults: any[];

  // Modal interaction
  selectedDay: any = null;
  selectedQuarterId: number = null;
  selectedQuarterIdStart: number = null;
  selectedQuarterIdEnd: number = null;

  getFrenchDateString: ((date: number)=> string);

  firstPlanningDay: number = null;
  lastPlanningDay: number = null;

  alerts: any[] = [];

  mode: string = '';

  searchedJobyer : string;

  schedulableDays : any[] = [];
  jobyersLoad : Map<number, CalendarQuarterPerDay>;

  constructor(private offersService: OffersService,
              public sharedService: SharedService,
              private searchService: SearchService,
              private recruitmentService: RecruitmentService,
              private router: Router,
              private loader: LoaderService) {

    this.currentUser = this.sharedService.getCurrentUser();
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));

    // Pointer definition
    this.getFrenchDateString = DateUtils.toFrenchDateString;

    this.jobyerHover = null;
    this.jobyersAvailabilities = new Map<number, CalendarQuarterPerDay>();
    this.jobyersConstraints = new Map<number, CalendarQuarterPerDay>();
    this.jobyersLoad = new Map<number, CalendarQuarterPerDay>();

    this.employerPlanning = new CalendarQuarterPerDay();
    this.updateView();

    this.offer = this.sharedService.getCurrentOffer();
    this.offersService.getOfferById(this.offer.idOffer, "employer", this.offer).then(()=> {

      if (this.offer == null) {
        this.employerPlanning = new CalendarQuarterPerDay();
        this.router.navigate(['offer/list']);
        return;
      }

      // Retrieve offer data
      this.employerPlanning = this.recruitmentService.loadSlots(this.offer.calendarData);
      this.extractSchedulableDays();
      this.retrieveLimits();

      this.updateView();

    });
  }

  ngOnInit(): void {
    this.displayedHour = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    for (let i = 0; i < this.nbBlockPerDay; ++i) {
      this.quartersPerDay.push(i);
    }
  }

  ngAfterViewInit(): void {

  }

  extractSchedulableDays(){
    if(!this.employerPlanning){
      return;
    }
    this.schedulableDays = [];
    for(let i = 0 ; i < this.employerPlanning.quartersPerDay.length ; i++){
      let q = this.employerPlanning.quartersPerDay[i];
      let day = q.date;
      let found = false;
      for(let j = 0 ; j < this.schedulableDays.length ; j++){
        if(this.schedulableDays[j] == day){
          found = true;
          break;
        }
      }

      if(found)
        continue;
      this.schedulableDays.push(day);
    }

  }

  seekJobyer(){

    // Affichage du loader
    this.loader.display();

    let offer = this.offer;

    // Récuperation des disponibilités des jobyers
    this.recruitmentService.retrieveJobyersAvailabilitiesByOfferAndName(offer.idOffer, this.searchedJobyer).then((data: any)=> {

      // Pour chaque jobyer
      for (let i = 0; i < data.length; i++) {

        let alwaysAvailable: boolean = false;
        let slots: CalendarSlot[] = [];
        let constraints: CalendarSlot[] = [];

        // On parcourt la liste des créneaux déjà utilisés
        for(let k = 0 ; k < data[i].constraints.length ; k++) {

          // On traduit de la donnée vers un objet CalendarSlot
          let slot = new CalendarSlot();
          slot.date = data[i].constraints[k].startDate;
          slot.dateEnd = data[i].constraints[k].endDate;
          slot.startHour = data[i].constraints[k].startHour;
          slot.endHour = data[i].constraints[k].endHour;

          // S'il n y a pas de date de fin, cela signifie que c'est sur un jour, donc date de fin égal à date de début
          if (!slot.dateEnd) {
            slot.dateEnd = slot.date;
          }
          constraints.push(slot);
        }

        // On parcours la liste des créneaux annoncés comme disponibles
        for (let j = 0; j < data[i].availabilities.length; ++j) {

          // On traduit de la donnée vers un objet CalendarSlot
          let slot = new CalendarSlot();
          slot.date = data[i].availabilities[j].startDate;
          slot.dateEnd = data[i].availabilities[j].endDate;
          slot.startHour = data[i].availabilities[j].startHour;
          slot.endHour = data[i].availabilities[j].endHour;

          // S'il n y a pas de date de fin, cela signifie que c'est sur un jour, donc date de fin égal à date de début
          if (!slot.dateEnd) {
            slot.dateEnd = slot.date;
          }

          let date = new Date(slot.date).getTime();
          let dateEnd = new Date(slot.dateEnd).getTime();

          // Vérification si le créneau doit être pris en compte ou ignoré
          if ((date >= this.firstPlanningDay && date <= this.lastPlanningDay)
            || (dateEnd >= this.firstPlanningDay && dateEnd <= this.lastPlanningDay)) {
            slots.push(slot);
          }

          // If a slots cover all the planning, activate alwaysAvailable;
          if (date <= this.firstPlanningDay && dateEnd >= this.lastPlanningDay) {
            alwaysAvailable = true;
            slots = [];
            break;
          }

        }

        // Vérifie si un jobyer est déjà été importé
        let alreadyImportedJobyer = this.jobyers.filter((e)=> {
          return (e.id == data[i].id);
        });
        // Si oui, on lui ajoute simplement le créneau
        if (alreadyImportedJobyer.length > 0) {
          for (let j = 0; j < slots.length; ++j) {
            alreadyImportedJobyer[0].disponibilites.push(slots[j]);
          }
          alreadyImportedJobyer[0].toujours_disponible = (alreadyImportedJobyer[0].toujours_disponible || alwaysAvailable);
        } else {
          // Si non, on ajoute le jobyer à la liste des jobyers
          let jobyer ={
            id: data[i].id,
            titre: data[i].title,
            nom: data[i].name,
            prenom: data[i].firstname,
            avatar: 'assets/images/avatar.png',
            toujours_disponible: alwaysAvailable,
            disponibilites: slots,
            contraintes : constraints
          };
          this.jobyers.push(jobyer);

        }
      }

      // Ensuite, on parcourt tout les jobyers et on vérifie si celui-ci a un créneau couvre toute la mision
      // Si oui, on e passe comme toujours disponible
      for(let i = 0 ; i < this.jobyers.length ; i++){

        let alwaysBlue = true;
        for(let j = 0 ; j < this.offer.calendarData.length ; j++){
          let dayCovered = false;
          for(let k = 0 ; k < this.jobyers[i].disponibilites.length ; k++){
            let dateJ = new Date(this.jobyers[i].disponibilites[k].date);
            let dateO = this.offer.calendarData[j].date;

            if(DateUtils.isSameDay(dateO, dateJ)){
              dayCovered = true;
              if(this.jobyers[i].disponibilites[k].startHour>this.offer.calendarData[j].startHour ||
                this.jobyers[i].disponibilites[k].endHour<this.offer.calendarData[j].endHour){
                alwaysBlue = false;
                break;
              }
            }

          }

          if(!dayCovered){
            alwaysBlue = false;
            break;
          }

        }

        this.jobyers[i].toujours_disponible = alwaysBlue;
      }

      // Placer les jobyer toujours disponible en haut, Partiellement dispo au milieu et jamais dispo en bas
      this.jobyers.sort((a, b)=> {
        let aWeight = (a.toujours_disponible ? 2 : (a.disponibilites.length > 0 ? 1 : 0));
        let bWeight = (b.toujours_disponible ? 2 : (b.disponibilites.length > 0 ? 1 : 0));
        return bWeight - aWeight;
      });

      // Chargement des photos
      this.recruitmentService.retrieveJobyersPicture(this.jobyers).then((data: any)=> {});
      this.searchedJobyer = '';
      this.loader.hide();
    });

    this.sharedService.setCurrentOffer(offer);
  }

  /**
   * Calcul les bornes de début et de fin de mission afin de controler si des créneaux jobyers couvrent toutes la mission
   */
  retrieveLimits() {
    for (let i = 0; i < this.employerPlanning.quartersPerDay.length; ++i) {
      let date = new Date(this.employerPlanning.quartersPerDay[i].date).getTime();
      if (!this.firstPlanningDay || date < this.firstPlanningDay) {
        this.firstPlanningDay = date;
      }
      if (!this.lastPlanningDay || date > this.lastPlanningDay) {
        this.lastPlanningDay = date;
      }
    }
    this.firstPlanningDay -= 24 * 60 * 60 * 1000;
    this.lastPlanningDay += 24 * 60 * 60 * 1000;
  }



  loadResult(): void {

    let jsonResults = this.sharedService.getLastResult();
    if (jsonResults) {
      this.searchResults = jsonResults;
      for (let i = 0; i < this.searchResults.length; i++) {
        let r = this.searchResults[i];

        // Security for removed account
        if (r.idJobyer == 0) {
          continue;
        }
        r.avatar = '';
      }
    }
  }

  /**
   * Return the jobyer color number in order to generate CSS class name
   *
   * @param jobyerId
   * @returns {number}
   */
  getJobyerColor(jobyerId) {
    if (Utils.isEmpty(this.jobyerColors) === true) {
      this.jobyerColors = [];
    }
    if (Utils.isEmpty(this.jobyerColors[jobyerId]) === true) {
      this.jobyerColors[jobyerId] = this.jobyerColorNb++;
    }
    // return this.jobyerColors[jobyerId];
    return 1;
  }

  /**
   * Compute the Quarter CSS effect : color, border size, background color, etc.
   *
   * @param day
   * @param quarterId
   * @returns {string}
   */
  getQuarterColor(day, quarterId): string {

    let quarterClass: string = '';

    // Si la case contient non, on ignore car cela n'est pas un créneaux de l'offre
    if (day.quarters[quarterId] !== null) {
      if (this.selectedDay == day && quarterId >= this.selectedQuarterIdStart && quarterId <= this.selectedQuarterIdEnd) {
        quarterClass += ' slot-selected';
      }
      // Si la case contient une valeur, c'est l'id du jobyer affecté
      if (day.quarters[quarterId] > 0) {
        quarterClass += ' offer-recruit-slots-quarter-assigned';
        quarterClass += ' assigned-'  + this.getJobyerColor(day.quarters[quarterId]);
      }
      // On ajoute la class CSS pour colorer le créneaux
      quarterClass += ' offer-recruit-slots-quarter-required';
      // Si c'est un début ou une fin de créneau, on ajoute une classe pour arrondir les bords : gauche
      if (quarterId == 0 || day.quarters[quarterId - 1] === null) {
        quarterClass += '-left';
      }
      // Si c'est un début ou une fin de créneau, on ajoute une classe pour arrondir les bords : droite
      else if (quarterId == (24 * 15 - 1) || day.quarters[quarterId + 1] === null) {
        quarterClass += '-right';
      }
    }

    return quarterClass;
  }


  /**
   * Compute the Quarter CSS effect : color, border size, background color, etc.
   *
   * @param day
   * @param quarterId
   * @returns {string}
   */
  getQuarterColorHover(day, quarterId): string {
    let date = day.date;

    // Retrieve if a selected jobyer is available
    let jobyersQuarters = null;

    // If on jobyer is mouseover
    if (this.jobyerHover !== null) {
      if (this.jobyerHoverAlwaysAvailable == true) {
        jobyersQuarters = [];
        jobyersQuarters[quarterId] = this.jobyerHover.id;
      } else {
        // Get the jobyer availabilities
        jobyersQuarters = this.recruitmentService.isJobyerAvailable(
          date, this.jobyersAvailabilities.get(this.jobyerHover.id), quarterId
        );
      }
    }

    let quarterClass: string = '';
    if (day.quarters[quarterId] !== null) {
      if (Utils.isEmpty(jobyersQuarters) === false) {
        quarterClass += ' offer-recruit-slots-quarter-match';
      }
    }
    else {
      if (Utils.isEmpty(jobyersQuarters) === false) {
        quarterClass += ' offer-recruit-slots-quarter-available';
      }
    }

    if (quarterId == 0 || (jobyersQuarters == null || jobyersQuarters.length == 0 || jobyersQuarters[quarterId - 1] === null)) {
      quarterClass += '-left';
    }
    else if (quarterId == (24 * 15 - 1) || (jobyersQuarters == null || jobyersQuarters.length == 0 || jobyersQuarters[quarterId + 1] === null)) {
      quarterClass += '-right';
    }

    return quarterClass;
  }

  /**
   * Compute all the HTML classes and stock them into an array that the view will parse
   */
  updateView() {
    for (let i = 0; i < this.employerPlanning.quartersPerDay.length; ++i) {
      let day = this.employerPlanning.quartersPerDay[i];
      let jobyerId = 0;
      for (let quarterId = 0; quarterId < 96; ++quarterId) {

        // Get slot shape
        if (Utils.isEmpty(this.planningColor[i]) == true) {
          this.planningColor[i] = [];
        }
        this.planningColor[i][quarterId] = this.getQuarterColor(day, quarterId);

        // Get slots hover
        if (Utils.isEmpty(this.planningColorHover[i]) == true) {
          this.planningColorHover[i] = [];
        }
        this.planningColorHover[i][quarterId] = this.getQuarterColorHover(day, quarterId);

        if (day.quarters[quarterId] != null) {
          jobyerId = day.quarters[quarterId];
        }
      }
      let jobyer = this.jobyers.filter((e)=> {
        return (e.id == jobyerId);
      })
      this.planningJobyer[i] = (jobyer.length > 0)
        ? ((jobyer[0].prenom ? jobyer[0].prenom.substring(0, 1) + '.' : '') + ' ' + jobyer[0].nom)
        : ''
      ;
    }
  }

  unselectJobyer(): void {
    this.jobyerHover = null;
  }

  selectJobyer(jobyer: any): void {
    this.unselectAll();
    this.jobyerHover = jobyer;
    this.previewJobyerAvailabilities(jobyer);
  }

  /**
   * Display the jobyer availabilities into the employer planning
   *
   * @param jobyer
   */
  previewJobyerAvailabilities(jobyer: any): void {
    // this.jobyerHoverAlwaysAvailable = jobyer.toujours_disponible;

    let dateLimitStart = new Date(this.employerPlanning.quartersPerDay[0].date);
    let dateLimitEnd = new Date(this.employerPlanning.quartersPerDay[
      this.employerPlanning.quartersPerDay.length - 1
      ].date
    );

    this.recruitmentService.loadJobyerAvailabilities(
      this.jobyersAvailabilities,
      jobyer,
      dateLimitStart,
      dateLimitEnd
    );

    this.recruitmentService.loadJobyerConstraints(
      this.jobyersConstraints,
      jobyer,
      dateLimitStart,
      dateLimitEnd
    );

    this.jobyerHoverAlwaysAvailable = jobyer.toujours_disponible;

    this.updateJobyerLoad(jobyer);

    this.updateView();

  }

  updateJobyerLoad(jobyer){
    let constraints = this.jobyersConstraints.get(jobyer.id);
    let qpd = new CalendarQuarterPerDay();
    qpd.quartersPerDay = [];

    for(let i=0 ; i < this.schedulableDays.length ; i++) {
      let day : string = this.schedulableDays[i];
      let maxQuarts = 24 * 4;
      let quarters : number[] = [];
      for(let j = 0 ; j < maxQuarts ; j++){
        quarters.push(0);
      }

      //  Check previous contracts
      for(let j = 0 ; j < constraints.quartersPerDay.length ; j++) {
        if(constraints.quartersPerDay[j].date != day)
          continue;
        let qcs = constraints.quartersPerDay[j];
        for(let qc = 0 ; qc < qcs.quarters.length ; qc++){
          let qval = qcs.quarters[qc];
          if(qval != null && qval ==0) {
            quarters[qc] = 1;       //  Occupied by another contract
          }
        }
      }

      //  Check employer
      for(let j = 0 ; j < this.employerPlanning.quartersPerDay.length ; j++) {
        if(this.employerPlanning.quartersPerDay[j].date != day)
          continue;
        let qcs = this.employerPlanning.quartersPerDay[j];
        for(let qc = 0 ; qc < qcs.quarters.length ; qc++){
          if(qcs.quarters[qc]==jobyer.id){
            quarters[qc]=1;
          }
        }
      }

      qpd.quartersPerDay.push({
        date : day,
        quarters : quarters
      });
    }

    this.jobyersLoad.set(jobyer.id, qpd);
  }

  unassignMode() {
    this.unselectAll();
    this.mode = 'unassign';
  }

  /**
   * Select a slot on the planning
   *
   * @param day
   * @param quarterId
   */
  selectSlot(day, quarterId): void {
    if (day.quarters[quarterId] == null) {
      return;
    }

    this.selectedDay = day;
    this.selectedQuarterId = quarterId;
    this.selectedQuarterIdStart = this.recruitmentService.getFirstQuarterOfSlot(day, quarterId);
    this.selectedQuarterIdEnd = this.recruitmentService.getLastQuarterOfSlot(day, quarterId);

    if (this.mode == 'unassign') {
      this.unassignSlot();
    } else {
      this.assignToSelectedJobyer();
    }
    this.updateView();
  }

  /**
   * Unselect slot
   */
  unselectSlot(): void {
    this.selectedDay = null;
    this.selectedQuarterId = null;
    this.selectedQuarterIdStart = null;
    this.selectedQuarterIdEnd = null;
    this.updateView();

  }

  /**
   * Assign the to this jobyer :
   * - If no slot selected, assign as much slot as possible
   * - If selected slot, assign only that slot
   */
  assignToSelectedJobyer(): void {

    if (this.jobyerHover == null) {
      return;
    }

    // If a quarter is selected, assign this quarter to this jobyer
    if (this.selectedDay != null) {
      let jobyerLoad = this.jobyersLoad.get(this.jobyerHover.id);
      this.assignselectSlotToThisJobyer(this.jobyerHover, jobyerLoad);
      this.unselectSlot();
    } else {
      let jobyerLoad = this.jobyersLoad.get(this.jobyerHover.id);
      // Neither assign as much quarters as possible to this jobyer
      this.recruitmentService.assignAsMuchQuarterAsPossibleToThisJobyer(
        this.employerPlanning,
        this.jobyersAvailabilities,
        this.jobyerHover,
        jobyerLoad
      );
    }
    this.updateJobyerLoad(this.jobyerHover);
    this.updateView();
    if (Utils.isEmpty(this.recruitmentService.errorMessage) == false) {
      Messenger().post({
        message: 'Ce créneau ne peut être complétement assigné à ce jobyer car : ' + this.recruitmentService.errorMessage,
        type: 'error',
        showCloseButton: true
      });
    }
  }

  /**
   * Unassign the selected slot of any jobyers
   */
  unassignSlot(): void {
    this.recruitmentService.assignSlotToThisJobyer(
      this.selectedDay,
      null,
      null,
      this.selectedQuarterIdStart,
      this.selectedQuarterIdEnd,
      this.employerPlanning
    )
  }

  assignselectSlotToThisJobyer(jobyer: any, jobyerLoad): void {
    if (jobyer === null) {
      return;
    }
    this.recruitmentService.loadJobyerAvailabilities(
      this.jobyersAvailabilities,
      jobyer
    );

    this.recruitmentService.assignSlotToThisJobyer(
      this.selectedDay,
      this.jobyersAvailabilities,
      jobyer,
      this.selectedQuarterIdStart,
      this.selectedQuarterIdEnd,
      this.employerPlanning,
      jobyerLoad
    );

  }

  /**
   * Control the selection detail status
   *
   * @returns {string}
   */
  getDetailStatusClass() {
    if (this.jobyerHover !== null) {
      return 'offer-recruit-detail-open';
    }
    return 'offer-recruit-detail-close';
  }

  formHasChanges() {
    if (this.recruitmentFinished === false) {
      return false;
    }
    return true;
  }

  /**
   * Validate and save the slots attribution
   */
  saveRepartition() {
    this.loader.display();
    this.recruitmentService.generateContractFromEmployerPlanning(
      this.offer,
      this.employerPlanning,
      this.jobyers,
      this.projectTarget,
      this.currentUser.employer.entreprises[0].id
    ).then((stateMsg) => {

      // Remove offer
      this.offersService.deleteOffer(this.offer, this.projectTarget).then((data: any) => {

        // Remove offer from cache
        let currentUser = this.sharedService.getCurrentUser();
        let offers: Offer[] = currentUser.employer.entreprises[0].offers;
        let currentOffer = currentUser.employer.entreprises[0].offers.filter((o)=> {
          return o.idOffer == this.offer.idOffer;
        });
        offers.slice(offers.indexOf(currentOffer[0]), 1);
        this.sharedService.setCurrentUser(currentUser);

        this.loader.hide();
        if (Utils.isEmpty(stateMsg)) {
          //aller à la page liste des contrats
          this.router.navigate(['contract/list']);
        } else {
          this.addAlert("danger", stateMsg);
        }
      });
    });
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  unselectAll(): void {
    this.mode = '';
    this.unselectSlot();
    this.unselectJobyer();
    this.updateView();
  }
}
