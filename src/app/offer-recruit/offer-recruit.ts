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
    Loader
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
  slotsPerDay2: CalendarQuarterPerDay;

  // Container the matrix of slots per jobyer
  slotsPerJobyer: {
    jobyer: any,
    slot: CalendarSlot[]
  }[] = [];

  // Result of the research
  searchResults: any[];

  constructor(private offersService: OffersService,
              private sharedService: SharedService,
              private searchService: SearchService,
              private profileService: ProfileService,
              private recruitmentService: RecruitmentService,
              private loader: LoaderService) {

    this.offer = new Offer();

    // Retrieve offer data
    this.loader.display();

    this.displayedHour = [2,4,6,8,10,12,14,16,18,20,22];

    this.slotsPerDay = new CalendarQuarterPerDay();
    this.slotsPerDay2 = new CalendarQuarterPerDay();

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
      this.quartPerDay.push(i + 1);
    }
  }

  ngAfterViewInit(): void {

  }


  /**
   * Translate slots into quarts
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
          nom: this.searchResults[i].nom,
          prenom: this.searchResults[i].prenom,
          avatar: this.searchResults[i].avatar,
          disponibilites: slots,
        })
      }

    });

  }

  loadResult(): void {

    // this.selected = this.sharedService.getMapView() !== false;
    // if (this.selected) {
    //   this.mapDisplay = 'block';
    // } else {
    //   this.mapDisplay = 'none';
    // }
    // this.searchResultPos = [];

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

        /*
        r.slots = [];
        // get disponibilities for jobyer
        this.offersService.getOfferCalendarDataById(r.idOffre, 'jobyer').then((data: any) => {
          r.dateSlots = [];
          if (data['calendarData'] && Utils.isEmpty(data['calendarData']) === false) {
            //order offer slots
            data['calendarData'].sort((a, b) => {
              return a.date - b.date
            });
            for (let i = 0; i < data['calendarData'].length; ++i) {
              //data['calendarData'][i].date = new Date(data['calendarData'][i].date);
              //data['calendarData'][i].dateEnd = new Date(data['calendarData'][i].dateEnd);
              let nb_days_diff = data.calendarData[i].dateEnd - data.calendarData[i].date;
              nb_days_diff = nb_days_diff / (60 * 60 * 24 * 1000);

              let slotTemp = {
                date: this.toDateString(data.calendarData[i].date),
                dateEnd: this.toDateString(data.calendarData[i].dateEnd),
                startHour: this.toHourString(data.calendarData[i].startHour),
                endHour: this.toHourString(data.calendarData[i].endHour),
                pause: data.calendarData[i].pause,
                nbDays: nb_days_diff
              };
              r.slots.push(slotTemp);
            }
          }
        });*/

        //     // Get if jobyer interested
        //     this.setCandidatureButtonLabel(r);
        //
        //     let availability = this.getAvailabilityText(r.availability.text);
        //     r.availabilityText = availability == '' ? '' : ((this.projectTarget=="employer" ? "Ce jobyer se situe à ":"Vous êtes à " ) + availability + " du lieu de la mission");
        //     r.availabiltyMinutes = this.getAvailabilityMinutes(r.availability.text);
        //     r.matching = Number(r.matching).toFixed(2);
        //     r.index = i + 1;
        //     r.avatar = "../assets/images/avatar.png";
        //
        //     if ((r.latitude !== '0' && r.longitude !== '0') &&
        //       !Utils.isEmpty(r.latitude) && !Utils.isEmpty(r.longitude)) {
        //       let info = "";
        //       let toffer = '';
        //       if(r.titreOffre && r.titreOffre.length>0)
        //         toffer = r.titreOffre;
        //
        //       let matching: string = (r.matching.toString().indexOf('.') < 0) ? r.matching : r.matching.toString().split('.')[0];
        //       if (this.projectTarget == 'employer') {
        //         info = "<h4>" + r.prenom + ' ' + r.nom.substring(0, 1) + ".&nbsp&nbsp<span class='label label-pill label-success'>&nbsp" + matching + "%&nbsp</span></h4>" +
        //           "<p>" + toffer + "</p>" +
        //           "<p><span class='dispo'>&#9679;</span> &nbsp; Disponible</p>" ;
        //
        //       } else {
        //         info = "<h4>" + r.entreprise + "&nbsp&nbsp<span class='label label-pill label-success'>&nbsp" + matching + "%&nbsp</span></h4>" +
        //           "<p>" + toffer + "</p>" +
        //           "<p><span class='dispo''>&#9679;</span> &nbsp; Disponible</p>";
        //       }
        //
        //       this.searchResultPos.push({lat: Number(r.latitude), lng: Number(r.longitude), info: info})
        //     }
        //   }
        //   // if (this.searchResultPos.length >= 1) {
        //   //   this.lat = +this.searchResultPos[0].lat;
        //   //   this.lng = +this.searchResultPos[0].lng;
        //   // }

      }

      /*
      //load profile pictures
      let jobyerTels: string[] = [];
      for (let i = 0; i < this.searchResults.length; i++) {
        // Make an array with all jobyers phone number
        jobyerTels.push(this.searchResults[i].tel);
      }
      // Load pictures for all of them with one request
      this.profileService.loadProfilesPictures(null, jobyerTels, 'jobyer').then((data: any) => {
        if (data && data.data) {
          for (let i = 0; i < this.searchResults.length; i++) {
            // Retrieve picture for this result
            let pic = data.data.filter((e) => {
              return (e.tel == this.searchResults[i].tel);
            });
            if (pic && !Utils.isEmpty(pic.encode) && pic.encode.startsWith("data:image/")) {
              this.searchResults[i].avatar = pic.encode;
            }
          }
        }
      });*/
    }

    // this.showAppropriateModal(this.obj);
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

  getQuartColor(day, quartId): string {
    let date = day.date;

    // Retrieve if a selected jobyer is available
    let jobyerAvailable: boolean = false;
    let jobyersQuarters = this.slotsPerDay2.slotsPerDay.filter((d) => {
      return d.date == date;
    });
    if (jobyersQuarters.length > 0) {
      if (jobyersQuarters[0].quarts[quartId] !== null) {
        jobyerAvailable = true;
      } else {
        jobyerAvailable = false;
      }
    }

    let quarterClass: string = '';
    if (day.quarts[quartId] !== null) {
      if (jobyerAvailable === false) {
        quarterClass = 'offer-recruit-slots-quart-required';
      }
      else {
        quarterClass = 'offer-recruit-slots-quart-match';
      }
      if (quartId == 0 || day.quarts[quartId - 1] === null) {
        quarterClass += '-left';
      }
      if (quartId == (24 * 15 - 1) || day.quarts[quartId + 1] === null) {
        quarterClass += '-right';
      }
    }
    else {
      if (null && jobyerAvailable === true) {
        quarterClass = 'offer-recruit-slots-quart-available';
      }
    }

    return quarterClass;
  }

  isQuart(slot, quartId) {
    if (slot.quarts[quartId] !== null) {
      return true;
    }
    return false;
  }

  /**
   * Assign as much slot as possible to a jobyer
   *
   * @param jobyer
   */
  assignToThisJobyer(jobyer: any): void {
    console.log(jobyer);
    this.slotsPerDay2 = this.recruitmentService.assignAsMuchQuartAsPossibleToThisJobyer(
      this.slotsPerDay, jobyer
    );
    // this.slotsPerJobyer.filter((e) => {
    //   return e.jobyer = jobyer;
    // })
    // if (this.slotsPerJobyer == 0) {
    //   this.slotsPerJobyer.push({
    //     jobyer: jobyer,
    //   })
    // }
  }
}
