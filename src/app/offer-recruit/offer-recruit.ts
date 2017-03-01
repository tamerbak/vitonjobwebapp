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
    RecruitmentService
  ]
})
export class OfferRecruit {

  recruitmentFinished: boolean = false;

  // The current offer
  offer: Offer;

  // Contains the list of available jobyers
  jobyers: any[] = [];
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
  jobyerHover: number;
  jobyerHoverAlwaysAvailable: boolean = false;

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

  constructor(private offersService: OffersService,
              private sharedService: SharedService,
              private searchService: SearchService,
              private recruitmentService: RecruitmentService,
              private router: Router,
              private loader: LoaderService) {

    // Pointer definition
    this.getFrenchDateString = DateUtils.toFrenchDateString;

    this.jobyerHover = 0;
    this.jobyersAvailabilities = new Map<number, CalendarQuarterPerDay>();

    this.offer = this.sharedService.getCurrentOffer();

    if (this.offer == null) {
      this.employerPlanning = new CalendarQuarterPerDay();
      this.router.navigate(['offer/list']);
      return;
    }

    // Retrieve offer data
    this.employerPlanning = this.recruitmentService.loadSlots(this.offer.calendarData);
    this.getJobyerList();

  }

  ngOnInit(): void {
    this.displayedHour = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    for (let i = 0; i < this.nbBlockPerDay; ++i) {
      this.quartersPerDay.push(i);
    }
  }

  ngAfterViewInit(): void {

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
          slots.push(slot);
        }
        this.jobyers.push({
          id: this.searchResults[i].idJobyer,
          titre: this.searchResults[i].titre,
          nom: this.searchResults[i].nom,
          prenom: this.searchResults[i].prenom,
          avatar: this.searchResults[i].avatar,
          toujours_disponible: false,// this.searchResults[i].toujours_disponible,
          disponibilites: slots,
        })
      }

      this.recruitmentService.retreiveJobyersAlwaysAvailable(this.jobyers);
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
    return this.jobyerColors[jobyerId];
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
        quarterClass += ' assigned-' + this.getJobyerColor(day.quarters[quarterId]);
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
    if (this.jobyerHover > 0) {
      if (this.jobyerHoverAlwaysAvailable == true) {
        jobyersQuarters = [];
        jobyersQuarters[quarterId] = this.jobyerHover;
      } else {
        // Get the jobyer availabilities
        jobyersQuarters = this.recruitmentService.isJobyerAvailable(
          date, this.jobyersAvailabilities.get(this.jobyerHover), quarterId
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
   * Display the jobyer availabilities into the employer planning
   *
   * @param jobyer
   */
  previewJobyerAvailabilities(jobyer: any): void {
    this.jobyerHover = jobyer.id;
    this.jobyerHoverAlwaysAvailable = (jobyer.toujours_disponible == "Oui" ? true : false);
    this.recruitmentService.loadJobyerAvailabilities(
      this.jobyersAvailabilities,
      jobyer
    );
  }

  /**
   * Stop to display the jobyer availabilities into the employer planning
   */
  cancelPreviewJobyerAvailabilities() {
    this.jobyerHover = 0;
  }

  /**
   * Select a slot on the planning
   *
   * @param day
   * @param quarterId
   */
  selectedSlot(day, quarterId): void {
    if (day.quarters[quarterId] == null) {
      this.unselectedSlot();
      return;
    }
    this.selectedDay = day;
    this.selectedQuarterId = quarterId;
    this.selectedQuarterIdStart = this.recruitmentService.getFirstQuarterOfSlot(day, quarterId);
    this.selectedQuarterIdEnd = this.recruitmentService.getLastQuarterOfSlot(day, quarterId);
  }

  /**
   * Unselect slot
   */
  unselectedSlot(): void {
    this.selectedDay = null;
    this.selectedQuarterId = null;
    this.selectedQuarterIdStart = null;
    this.selectedQuarterIdEnd = null;
  }

  /**
   * Assign the to this jobyer :
   * - If no slot selected, assign as much slot as possible
   * - If selected slot, assign only that slot
   *
   * @param jobyer
   */
  assignToSelectedJobyer(jobyer): void {
    // If a quarter is selected, assign this quarter to this jobyer
    if (this.selectedDay != null) {
      this.assignSelectedSlotToThisJobyer(jobyer);
      this.unselectedSlot();
    } else {
      // Neither assign as much quarters as possible to this jobyer
      this.recruitmentService.assignAsMuchQuarterAsPossibleToThisJobyer(
        this.employerPlanning,
        this.jobyersAvailabilities,
        jobyer.id
      );
    }
  }

  /**
   * Unassign the selected slot of any jobyers
   */
  unassignSlot(): void {
    // this.recruitmentService.assignSlotToThisJobyer(
    //   this.selectedDay,
    //   this.jobyersAvailabilities,
    //   0
    // );
  }

  assignSelectedSlotToThisJobyer(jobyer: any): void {
    if (jobyer === null) {
      return;
    }
    this.recruitmentService.loadJobyerAvailabilities(
      this.jobyersAvailabilities,
      jobyer
    );

    let from = this.selectedQuarterIdStart;
    let to = this.selectedQuarterIdEnd;

    // TODO: to improve because assign temporary all the day
    this.recruitmentService.assignSlotToThisJobyer(
      this.selectedDay,
      this.jobyersAvailabilities,
      jobyer.id,
      from,
      to
    )
  }

  /**
   * Control the selection detail status
   *
   * @returns {string}
   */
  getDetailStatusClass() {
    if (this.selectedDay !== null) {
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

  onRecruite() {
    this.sharedService.setCurrentJobyer(this.currentJobyer);
    jQuery('#modal-notification-contract').modal({
      keyboard: false,
      backdrop: 'static'
    });
    jQuery('#modal-notification-contract').modal('show');
  }
}
