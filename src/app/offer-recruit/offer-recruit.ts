import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
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
import {CalendarQuarterPerDay} from "../../dto/CalendarQuarterPerDay";
import {RecruitmentService} from "../../providers/recruitment-service";
import {Utils} from "../utils/utils";
import {ModalTeam} from "./modal-team/modal-team";

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
    ModalTeam
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

  // The current offer
  offer: Offer;

  // Contains the list of available jobyers
  jobyers: any[] = [];

  displayedHour = [];

  // Nb slot per day
  // 4 quart per hour * 24
  nbBlockPerDay = 4 * 24;
  quartPerDay: any[] = [];

  // Contains the list of slots
  slots: any[] = [];
  slotsPerDay: CalendarQuarterPerDay;
  slotsPerDayHover: CalendarQuarterPerDay;
  jobyersAvailabilities: Map<number, CalendarQuarterPerDay>;
  jobyerHover: number;

  assignements: number[];
  assignementNb: number = 1;

  // Container the matrix of slots per jobyer
  slotsPerJobyer: {
    jobyer: any,
    slot: CalendarSlot[]
  }[] = [];

  // Result of the research
  searchResults: any[];

  // Modal interaction
  selectedDay: any = null;
  selectedQuarterId: number = null;
  selectedQuarterIdStart: number = null;
  selectedQuarterIdEnd: number = null;

  constructor(private offersService: OffersService,
              private sharedService: SharedService,
              private searchService: SearchService,
              private profileService: ProfileService,
              private recruitmentService: RecruitmentService,
              private loader: LoaderService) {

    this.offer = new Offer();

    // Retrieve offer data
    this.loader.display();

    this.displayedHour = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

    this.slotsPerDay = new CalendarQuarterPerDay();
    this.slotsPerDayHover = new CalendarQuarterPerDay();

    this.jobyersAvailabilities = new Map<number, CalendarQuarterPerDay>();
    this.jobyerHover = 0;

    this.offersService.getOfferById(2163, 'employer', this.offer).then(()=> {
      this.loader.hide();

      console.log('Chargement des slots');
      this.slotsPerDay = this.recruitmentService.loadSlots(this.offer.calendarData);
      console.log('Recherche des jobyers');
      this.launchSearch();

    });

  }

  ngOnInit(): void {
    for (let i = 0; i < this.nbBlockPerDay; ++i) {
      this.quartPerDay.push(i);
    }
  }

  ngAfterViewInit(): void {

  }


  /**
   * Translate slots into quarters
   *
   loadSlots(): void {
    this.slotsPerJobyer = [];
    this.slots = this.offer.calendarData;

    this.slotsPerDay = new CalendarQuarterPerDay();
    for (let i: number = 0; i < this.slots.length; ++i) {

      let quart: CalendarQuarter = new CalendarQuarter(this.slots[i].date);
      quart.setHours(this.slots[i].startHour / 60);
      quart.setMinutes(this.slots[i].startHour % 60);

      let quartEnd = new Date(this.slots[i].dateEnd);
      quartEnd.setHours(this.slots[i].endHour / 60);
      quartEnd.setMinutes(this.slots[i].endHour % 60);

      do {
        console.log(quart);

        this.slotsPerDay.pushQuart(this.slotsPerDay, quart);
        quart = new CalendarQuarter(quart.getTime() + 15 * 60 * 1000);
      } while (quart.getTime() <= quartEnd.getTime());
      console.log('Slots per day');
    }
    console.log('Slots per day all');
    console.log(this.slotsPerDay);
  }*/

  /**
   * Get the list of available jobyer matching with offer's criteria
   */
  launchSearch(): void {
    var offer = this.offer;

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

      // TODO : To remove, temporary assignement
      for (let i = 0; i < this.searchResults.length; i++) {

        if (this.searchResults[i].idJobyer <= 0) {
          continue;
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
          nom: this.searchResults[i].nom,
          prenom: this.searchResults[i].prenom,
          avatar: this.searchResults[i].avatar,
          disponibilites: slots,
        })
      }

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

  toDateString(date: number) {
    var dateOptions = {
      weekday: "long", month: "long", year: "numeric",
      day: "numeric"//, hour: "2-digit", minute: "2-digit"
    };
    return new Date(date).toLocaleDateString('fr-FR', dateOptions);
  }

  toHourString(time: number) {
    let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
    let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
    return hours + ":" + minutes;
  }

  getJobyerColor(jobyerId) {
    let nbColors = 5;

    if (Utils.isEmpty(this.assignements) === true) {
      this.assignements = [];
    }
    if (Utils.isEmpty(this.assignements[jobyerId]) === true) {
      this.assignements[jobyerId] = this.assignementNb++;
    }
    return this.assignements[jobyerId];
  }

  getQuarterColor(day, quarterId): string {
    let date = day.date;

    // Retrieve if a selected jobyer is available
    let jobyersQuarters = null;

    // If on jobyer is mouseover
    if (this.jobyerHover > 0) {
      // Get the jobyer availabilities
      jobyersQuarters = this.recruitmentService.isJobyerAvailable(
        date, this.jobyersAvailabilities.get(this.jobyerHover), quarterId
      );
    }

    let quarterClass: string = '';
    if (day.quarters[quarterId] > 0) {
      quarterClass += ' offer-recruit-slots-quarter-assigned';
      quarterClass += ' assigned-' + this.getJobyerColor(day.quarters[quarterId]);
    }
    else if (day.quarters[quarterId] !== null) {
      if (Utils.isEmpty(jobyersQuarters) === true) {
        if (this.selectedDay == day && quarterId >= this.selectedQuarterIdStart && quarterId <= this.selectedQuarterIdEnd) {
          quarterClass += ' slot-selected';
        }
        quarterClass += ' offer-recruit-slots-quarter-required';
      }
      else {
        quarterClass += ' offer-recruit-slots-quarter-match';
      }
    }
    else {
      if (Utils.isEmpty(jobyersQuarters) === false) {
        quarterClass += ' offer-recruit-slots-quarter-available';
      }
    }

    if (quarterId == 0 || (day.quarters[quarterId - 1] === null && (jobyersQuarters == null || jobyersQuarters.length == 0 || jobyersQuarters[quarterId - 1] === null))) {
      quarterClass += '-left';
    }
    else if (quarterId == (24 * 15 - 1) || (day.quarters[quarterId + 1] === null && (jobyersQuarters == null || jobyersQuarters.length == 0 || jobyersQuarters[quarterId + 1] === null))) {
      quarterClass += '-right';
    }

    return quarterClass;
  }

  /**
   * Assign as much slot as possible to a jobyer
   *
   * @param jobyer
   */
  previewJobyer(jobyer: any): void {
    this.jobyerHover = jobyer.id;
    this.recruitmentService.loadJobyerAvailabilities(
      this.jobyersAvailabilities,
      jobyer
    );
  }

  cancelPreviewJobyer() {
    this.jobyerHover = 0;
  }

  assignQuartersToSelectedJobyer(jobyer): void {
    // If a quarter is selected, assign this quarter to this jobyer
    if (this.selectedDay != null) {
      this.assignSelectedSlotToThisJobyer(jobyer);
      this.unselectedSlot();
    } else {
      // Neither assign as much quarters as possible to this jobyer
      this.recruitmentService.assignAsMuchQuarterAsPossibleToThisJobyer(
        this.slotsPerDay,
        this.jobyersAvailabilities,
        jobyer.id
      );
    }
  }

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

  unselectedSlot(): void {
    this.selectedDay = null;
    this.selectedQuarterId = null;
    this.selectedQuarterIdStart = null;
    this.selectedQuarterIdEnd = null;
  }

  unassignSlot(): void {
    this.recruitmentService.assignSlotToThisJobyer(
      this.selectedDay,
      this.jobyersAvailabilities,
      0
    )
  }

  assignSelectedSlotToThisJobyer(jobyer: any): void {
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
      jobyer.id
    )
  }

  getDetailStatusClass() {
    if (this.selectedDay !== null) {
      return 'offer-recruit-detail-open';
    }
    return 'offer-recruit-detail-close';
  }
}
