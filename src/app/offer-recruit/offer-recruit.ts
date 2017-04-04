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

      this.retrieveLimits();

      this.getJobyerList();

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

  /**
   * Get the list of available jobyer matching with offer's criteria
   */
  getJobyerList(): void {
    let offer = this.offer;

    let searchQuery = {
      'class': 'com.vitonjob.recherche.model.SearchQuery',
      queryType: 'OFFER',
      idOffer: offer.idOffer,
      resultsType: 'jobyer'
    };
    this.searchService.advancedSearch(searchQuery).then((data: any)=> {
      this.sharedService.setLastResult(data);
      this.sharedService.setCurrentOffer(offer);
      this.sharedService.setCurrentSearch(null);
      this.sharedService.setCurrentSearchCity(null);
      this.loadResult();

      console.log('Jobyers trouvés');
      console.log(this.searchResults);

      // TODO : To remove, temporary jobyerColor
      for (let i = 0; i < this.searchResults.length; i++) {

        if (this.searchResults[i].idJobyer <= 0) {
          continue;
        }

        if (this.currentJobyer == null) {
          this.currentJobyer = this.searchResults[i];
        }

        let alwaysAvailable: boolean = false;
        let slots: CalendarSlot[] = [];

        for (let j = 0; j < this.searchResults[i].disponibilites.length; ++j) {
          let slot = new CalendarSlot();
          slot.date = this.searchResults[i].disponibilites[j].startDate;
          slot.dateEnd = this.searchResults[i].disponibilites[j].endDate;
          slot.startHour = this.searchResults[i].disponibilites[j].startHour;
          slot.endHour = this.searchResults[i].disponibilites[j].endHour;
          if (!slot.dateEnd) {
            slot.dateEnd = slot.date;
          }

          let date = new Date(slot.date).getTime();
          let dateEnd = new Date(slot.dateEnd).getTime();
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

        let alreadyImportedJobyer = this.jobyers.filter((e)=> {
          return (e.id == this.searchResults[i].idJobyer);
        });
        if (alreadyImportedJobyer.length > 0) {
          for (let j = 0; j < slots.length; ++j) {
            alreadyImportedJobyer[0].disponibilites.push(slots[j]);
          }
          alreadyImportedJobyer[0].toujours_disponible = (alreadyImportedJobyer[0].toujours_disponible || alwaysAvailable);
        } else {
          this.jobyers.push({
            id: this.searchResults[i].idJobyer,
            titre: this.searchResults[i].titre,
            nom: this.searchResults[i].nom,
            prenom: this.searchResults[i].prenom,
            avatar: 'assets/images/avatar.png',
            toujours_disponible: alwaysAvailable,
            disponibilites: slots,
          });
        }
      }

      this.recruitmentService.retrieveJobyersAlwaysAvailable(this.jobyers).then((data: any)=> {
        // Order by : Always available, Partial available, Never available
        this.jobyers.sort((a, b)=> {
          let aWeight = (a.toujours_disponible ? 2 : (a.disponibilites.length > 0 ? 1 : 0));
          let bWeight = (b.toujours_disponible ? 2 : (b.disponibilites.length > 0 ? 1 : 0));
          return bWeight - aWeight;
        })
      });

      this.recruitmentService.retrieveJobyersPicture(this.jobyers).then((data: any)=> {});

    });

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

    if (day.quarters[quarterId] !== null) {
      if (this.selectedDay == day && quarterId >= this.selectedQuarterIdStart && quarterId <= this.selectedQuarterIdEnd) {
        quarterClass += ' slot-selected';
      }
      if (day.quarters[quarterId] > 0) {
        quarterClass += ' offer-recruit-slots-quarter-assigned';
        quarterClass += ' assigned-'  + this.getJobyerColor(day.quarters[quarterId]);
      }
      quarterClass += ' offer-recruit-slots-quarter-required';
      if (quarterId == 0 || day.quarters[quarterId - 1] === null) {
        quarterClass += '-left';
      }
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
    this.jobyerHoverAlwaysAvailable = jobyer.toujours_disponible;

    this.updateView();
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
      this.assignselectSlotToThisJobyer(this.jobyerHover);
      this.unselectSlot();
    } else {
      // Neither assign as much quarters as possible to this jobyer
      this.recruitmentService.assignAsMuchQuarterAsPossibleToThisJobyer(
        this.employerPlanning,
        this.jobyersAvailabilities,
        this.jobyerHover
      );
    }
    this.updateView();
    if (Utils.isEmpty(this.recruitmentService.errorMessage) == false) {
      Messenger().post({
        message: 'Ce créneau ne peut être assigné à ce jobyer car : ' + this.recruitmentService.errorMessage,
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

  assignselectSlotToThisJobyer(jobyer: any): void {
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
      this.employerPlanning
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
          return o.idOffer = this.offer.idOffer;
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
