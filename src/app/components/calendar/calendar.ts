import {Component, Input, SimpleChanges} from "@angular/core";
import {OffersService} from "../../../providers/offer.service";
import {SharedService} from "../../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {ModalOptions} from "../../modal-options/modal-options";
import {Utils} from "../../utils/utils";
import {DateUtils} from "../../utils/date-utils";
import {ModalSlots} from "./modal-slots/modal-slots";
import {AdvertService} from "../../../providers/advert.service";
import {CalendarSlot} from "../../../dto/calendar-slot";

declare var Messenger, jQuery: any;
declare var google: any;
declare var moment: any;
declare var require;

@Component({
  selector: '[voj-calendar]',
  template: require('./calendar.html'),
  directives: [
    ROUTER_DIRECTIVES,
    AlertComponent,
    NKDatetime,
    ModalOptions,
    ModalSlots,
    Calendar
  ],
  providers: [OffersService, AdvertService]
})
export class Calendar {
  @Input()
  slots: any[];

  projectTarget: string;
  currentUser: any;
  slot: CalendarSlot;

  alerts: Array<Object>;
  alertsSlot: Array<Object>;
  alertsConditionEmp: Array<Object>;
  datepickerOpts: any;
  obj: string;

  dataValidation: boolean = false;
  triedValidate: boolean = false;

  //Full time
  isFulltime: boolean = false;
  isPause: boolean = false;

  //Calendar
  calendar: any;
  $calendar: any;
  dragOptions: Object = {zIndex: 999, revert: true, revertDuration: 0};
  event: any = {};

  plageDate: string;
  isPeriodic: boolean = false;

  startDate: any;
  endDate: any;
  untilDate: any;
  createEvent: any;

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private router: Router,
              private route: ActivatedRoute,
              private advertService: AdvertService) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    }

    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));

    //obj = "add", "detail", or "recruit"
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
    });
  }

  ngOnInit(): void {

    // Init Calendar
    this.initCalendar();
    this.$calendar = jQuery('#calendar');
    this.$calendar.fullCalendar(this.calendar);
    jQuery('.draggable').draggable(this.dragOptions);

    //init slot
    this.slot = new CalendarSlot();

    //dateoption for slotDate
    this.datepickerOpts = {
      language: 'fr-FR',
      startDate: new Date(),
      autoclose: true,
      todayHighlight: true,
      format: 'dd/mm/yyyy'
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slots']) {
      if (this.calendar && this.calendar.events) {
        this.calendar.events = this.convertDetailSlotsForCalendar(true);
        this.$calendar = jQuery('#calendar');
        this.$calendar.fullCalendar(this.calendar);
      }
    }
  }

  ngAfterViewInit() {
    //get timepickers elements
    let elements = [];
    jQuery("input[id^='q-timepicker_']").each(function () {
      elements.push(this.id);
    });

    //add change event to endTime timepicker
    jQuery('#' + elements[1]).timepicker().on('changeTime.timepicker', function (e) {
      if (e.time.value == "0:00") {
        jQuery('#' + elements[1]).timepicker('setTime', '11:59 PM');
      }
    });

  }

  removeSlot(event) {
    if (this.obj != "detail") {
      //remove event from calendar
      let ev = this.calendar.events.filter((e)=> {
        return (new Date(e.start._d).getTime() == new Date(event.start._d).getTime() && new Date(e.end._d).getTime() == new Date(event.end._d).getTime());
      });
      let index = this.calendar.events.indexOf(ev[0]);
      if (index != -1) {
        this.calendar.events.splice(index, 1);
        this.$calendar.fullCalendar('removeEvents', function (event) {
          return new Date(event.start._d).getTime() == new Date(ev[0].start._d).getTime() && new Date(event.end._d).getTime() == new Date(ev[0].end._d).getTime();
        });
        this.slots.splice(index, 1);
      }
    } else {
      if (this.slots.length == 1) {
        this.addAlert("danger", "Une offre doit avoir au moins un créneau de disponibilité. Veuillez ajouter un autre créneau avant de pouvoir supprimer celui-ci.", "slot");
        return;
      }
      //searching event in the calendar events
      let ev = this.calendar.events.filter((e)=> {
        return (e.start == event.start._d.getTime() && e.end == event.end._d.getTime());
      });
      let index = this.calendar.events.indexOf(ev[0]);
      if (index != -1) {
        //removing event from calendar
        this.calendar.events.splice(index, 1);
        //render the calendar with the event removed
        this.$calendar.fullCalendar('removeEvents', function (event) {
          return new Date(event.start._d).getTime() == ev[0].start && new Date(event.end._d).getTime() == ev[0].end;
        });
        //remove slot from local
        this.slots.splice(index, 1);
        this.slots.splice(index, 1);
        //remove slot from remote
        // this.offersService.updateOfferCalendar(this.offer, this.projectTarget).then(() => {
        // });
      }
    }
    this.closeDetailsModal();
  }

  /**
   * Forge well formatted calendar slot and add it the the slots list
   *
   * @param ev
   */
  addSlot(ev) {

    if (this.slot.startHour == 0 || this.slot.endHour == 0) {
      return;
    }

    if (this.obj != "detail" || ev != 'drop') {

      let slotClone = this.offersService.cloneSlot(this.slot);
      let slotToSave = this.offersService.convertSlotsForSaving([slotClone]);

      if (slotToSave[0]) {
        let slot = new CalendarSlot();
        slot.date = new Date(slotToSave[0].date);
        slot.dateEnd = new Date(slotToSave[0].dateEnd);
        slot.endHour = slotToSave[0].endHour;
        slot.pause = slotToSave[0].pause;
        slot.startHour = slotToSave[0].startHour;
        this.slots.push(slot);
      }
    }
  }

  convertDetailSlotsForCalendar(refreshDisplay: boolean) {
    let events = [];
    if (this.slots) {
      for (let i = 0; i < this.slots.length; i++) {

        let isPause = this.slots[i].pause;
        let startHour = this.toHourString(this.slots[i].startHour);
        let endHour = this.toHourString(this.slots[i].endHour);
        let startDate = new Date(this.slots[i].date);
        let endDate = new Date(this.slots[i].dateEnd);

        let title = (isPause ? "Pause de " : "Créneau de ");
        let slotTemp = {
          id: this.slots[i].idCalendar,
          title: title + startHour + " à " + endHour,
          start: startDate.setHours(+startHour.split(":")[0], +startHour.split(":")[1], 0, 0),
          end: endDate.setHours(+endHour.split(":")[0], +endHour.split(":")[1], 0, 0),
          pause: isPause
        };

        if (refreshDisplay && title) {
          this.$calendar.fullCalendar('renderEvent',
            slotTemp,
            true // make the event "stick"
          );
        }
        events.push(slotTemp);
      }
    }
    return events;
  }

  convertEventsToSlots(events) {
    let eventsConverted = [];
    for (let i = 0; i < events.length; i++) {
      let slotTemp = {
        date: events[i].start._d,
        dateEnd: events[i].end._d,
        startHour: events[i].start._d,
        endHour: events[i].end._d,
        pause: events[i].pause
      };
      eventsConverted.push(slotTemp);
    }
    return eventsConverted;
  }

  checkHour(slots, slot) {
    this.alertsSlot = [];

    // Compute Minutes format start and end hour of the new slot
    let startHourH = slot.startHour.getHours();
    let startHourM = slot.startHour.getMinutes();
    let startHourTotMinutes = this.offersService.convertHoursToMinutes(startHourH + ':' + startHourM);
    let endHourH = slot.endHour.getHours();
    let endHourM = slot.endHour.getMinutes();
    let endHourTotMinutes = this.offersService.convertHoursToMinutes(endHourH + ':' + endHourM);

    // If end hour is 0:00, force 23:59 such as midnight minute
    if (endHourTotMinutes == 0) {
      endHourTotMinutes = (60 * 24) - 1;
    }

    // Check that today is over than the selected day
    let today = new Date().setHours(0, 0, 0);
    if (today > slot.date) {
      this.addAlert("danger", "La date sélectionnée doit être supérieure ou égale à la date d'aujourd'hui", "slot");
      return false;
    }

    // Check that end hour is over than begin hour
    if (slot.date.getTime() >= slot.dateEnd.getTime()) {
      this.addAlert("danger", "L'heure de début doit être inférieure à l'heure de fin", "slot");
      return false;
    }

    // Check that the slot is not overwriting an other one
    if (!slot.pause) {

      if (this.projectTarget == 'employer') {
        //total hours of one day should be lower than 10h
        let isDailyDurationRespected = this.offersService.isDailySlotsDurationRespected(slots, slot);
        if (!isDailyDurationRespected) {
          this.addAlert("danger", "Le total des heures de travail de chaque journée ne doit pas dépasser les 10 heures. Veuillez réduire la durée de ce créneau", "slot");
          return false;
        }

        if (!this.offersService.isSlotRespectsBreaktime(slots, slot)) {
          this.addAlert("danger", "Veuillez mettre un délai de 11h entre deux créneaux situés sur deux jours calendaires différents.", "slot");
          return false;
        }
      }
      for (let i = 0; i < slots.length; i++) {
        if ((slot.date >= slots[i].date && slot.dateEnd <= slots[i].dateEnd) || (slot.date >= slots[i].date && slot.date < slots[i].dateEnd) || (slot.dateEnd > slots[i].date && slot.dateEnd <= slots[i].dateEnd)) {
          this.addAlert("danger", "Ce créneau chevauche avec un autre", "slot");
          return false;
        }
      }
    } else {
      let isPauseValid = false;
      for (let i = 0; i < slots.length; i++) {
        if (((slot.date >= slots[i].date && slot.dateEnd <= slots[i].dateEnd) || (slot.date >= slots[i].date && slot.date < slots[i].dateEnd) || (slot.dateEnd > slots[i].date && slot.dateEnd <= slots[i].dateEnd)) && slots[i].pause) {
          this.addAlert("danger", "Cette pause chevauche avec une autre", "slot");
          return false;
        }

        //a break time should be included in a slot
        if (slot.date > slots[i].date && slot.dateEnd < slots[i].dateEnd && !slots[i].pause) {
          isPauseValid = true;
        }
      }
      if (!isPauseValid) {
        this.addAlert("danger", "La période de pause doit être incluse dans l'un des créneaux.", "slot");
        return false;
      }
    }
    return true;
  }

  resetDatetime(componentId) {
    let elements: NodeListOf<Element> = document.getElementById(componentId).getElementsByClassName('form-control');
    (<HTMLInputElement>elements[0]).value = null;
  }

  isDeleteSlotDisabled() {
    return (this.obj == "detail" && this.slots && this.slots.length == 1);
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
    let dateOptions = {
      weekday: "long", month: "long", year: "numeric",
      day: "numeric"//, hour: "2-digit", minute: "2-digit"
    };
    return new Date(date).toLocaleDateString('fr-FR', dateOptions);
  }

  getHourFromDate(time: number) {
    let d = new Date(time);
    let h = d.getHours();
    let m = +d.getMinutes();
    //m = (m.toString().length == 1 ? "0"+m : +m);
    return DateUtils.formatHours(h) + ":" + DateUtils.formatHours(m);
  }

  addAlert(type, msg, section): void {
    if (section == "general"
    ) {
      this.alerts = [{type: type, msg: msg}];
    }
    if (section == "slot") {
      this.alertsSlot = [{type: type, msg: msg}];
    }
    if (section == "conditionEmp") {
      this.alertsConditionEmp = [{type: type, msg: msg}];
    }
  }

  formHasChanges() {
    if (this.dataValidation) {
      return false;
    }
    return true;
  }

  watchFullTime(e) {
    this.isFulltime = e.target.checked;
    if (this.isFulltime) {
      this.slot.startHour = new Date(new Date().setHours(0, 0, 0, 0)).getDate();
      this.slot.endHour = new Date(new Date().setHours(23, 59, 0, 0)).getDate(); // TODO CHECK
      this.slot.pause = false;
      this.isPause = false;
    }
  }

  watchPause(e) {
    this.isPause = e.target.checked;
    if (this.isPause) {
      this.isFulltime = false;
      this.slot.pause = true;
    } else {
      this.slot.pause = false;
    }
  }

  watchPeriodicity(e) {
    this.isPeriodic = e.target.checked;
    // this.slot.isPeriodic = e.target.checked;
    // TODO KELVIN a voir
  }

  // calendar functions
  addEvent(event): void {
    this.calendar.events.push(event);
  };

  changeView(view): void {
    this.$calendar.fullCalendar('changeView', view);
  };

  currentMonth(): string {
    return moment(this.$calendar.fullCalendar('getDate')).format('MMM YYYY');
  };

  currentDay(): string {
    return moment(this.$calendar.fullCalendar('getDate')).format('dddd');

  };

  prev(): void {
    this.$calendar.fullCalendar('prev');
  };

  next(): void {
    this.$calendar.fullCalendar('next');
  };

  initCalendar() {
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();

    this.calendar = {
      header: {
        left: '',
        center: 'title',
        right: false
      },
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
        }
      },
      axisFormat: 'H:mm',
      slotDuration: '00:15:00',
      allDayText: "Au-delà d'un seul jour",
      events: [],//this.convertDetailSlotsForCalendar(false),
      selectable: true,
      selectHelper: true,
      eventDurationEditable: true,
      eventStartEditable: true,

      select: (start, end, allDay): any => {

        let today = new Date().setHours(0, 0, 0);
        if (start._d.getTime() < today) {
          this.addAlert("warning", "Vous ne pouvez pas sélectionner une date passée.", "general");
          return false;
        }

        this.startDate = start._d;
        this.untilDate = new Date(end._d.getTime() - (24 * 60 * 60 * 1000));
        this.endDate = end._d;

        /* Add to calculate the plageDate */
        let startTime = (start._d.getDate());
        let endTime = (end._d.getDate() - 1);

        this.plageDate = (startTime == endTime) ? 'single' : 'multiple';


        this.isPeriodic = true; // Périodique par défaut

        this.createEvent = () => {
          this.addSlotInCalendar(start, end, allDay);
        };
        this.resetSlotModal();
        jQuery('#create-event-modal').modal('show');
      },

      eventClick: (event): void => {
        this.event = event;
        jQuery('#show-event-modal').modal('show');
      },

      eventDrop: (event, delta, revertFunc): void => {
        this.dragSlot(event, revertFunc);
      },
      dayRender: (date, cell): void => {
        let today = new Date()
        today.setHours(0, 0, 0); // fix difference
        if (date < today)
          jQuery(cell).addClass('disabled');
      },
      lang: 'fr'
    };
  }

  addSlotInCalendar(start, end, allDay) {

    // Get hours from input when date come from calendar
    let hs = this.slot.startHour.getHours();
    let ms = this.slot.startHour.getMinutes();
    let he = this.slot.endHour.getHours();
    let me = this.slot.endHour.getMinutes();
    /*
     WORKAROUND THE PROBLEM OF IMPLICIT CONVERSION BETWEEN 12:00 AND 00:00
     */
    if (he == 0 && me == 0) {
      this.slot.endHour.setHours(12, 0, 0, 0);
      he = 12;
      me = 0;
    }

    /*
     NOW WE START THE REAL TREATMENT
     */
    start._d.setHours(hs, ms, 0, 0);
    end._d.setDate(end._d.getDate() - 1);
    end._d.setHours(he, me, 0, 0);

    //slots should be coherent
    this.slot.date = start._d;
    this.slot.dateEnd = end._d;

    if (this.plageDate == "multiple" && this.isPeriodic) {

      this.isPeriodic = false; // setting back to false to prevent default
      let nbDays = Math.floor((this.endDate - this.startDate) / (60 * 60 * 24 * 1000)) + 1;

      // Boucle de splittage slots with fix for special dates
      for (let n = 0; n < (nbDays > 1 ? nbDays : nbDays + 1); n++) {

        let date_debut = new Date(this.startDate.getFullYear(),
          this.startDate.getMonth(),
          this.startDate.getDate() + n,
          this.startDate.getHours(),
          this.startDate.getMinutes()
        );

        let date_arret = new Date(this.startDate.getFullYear(),
          this.startDate.getMonth(),
          this.startDate.getDate() + (nbDays > 1 ? n : n + 1),
          this.endDate.getHours(),
          this.endDate.getMinutes()
        );

        // Récupération du slot splitté
        let splitted_slot = {from: date_debut, to: date_arret};

        // Normalisation du slot généré par le split / day
        let normalized_slot = {
          date: date_debut,
          dateEnd: date_arret,
          startHour: date_debut,
          endHour: date_arret,
          pause: false,
          allDay: false
        };

        // + Vérification des slots
        if (this.checkHour(this.slots, normalized_slot)) {

          // Sauvegarde des slots splittés
          this.slots.push({
            date: date_debut,
            dateEnd: date_arret,
            startHour: hs * 60 + ms,
            endHour: he * 60 + me,
            pause: false,
            allDay: false
          });

          // Actualisation du rendu graphique
          this.pushSlotInCalendar(splitted_slot)
        } else {
          let infos = "";//"<br>" + "- Le "+splitted_slot.from.toLocaleDateString() + '.'; // Can't do multi alerts - fix
          this.addAlert("warning", " Certains créneaux que vous avez sélectionnés ne sont pas valides" + infos, "general");
        }
      }

      jQuery('#create-event-modal').modal('hide');
      return true;
    }

    if (this.checkHour(this.slots, this.slot) == false) {
      end._d.setDate(end._d.getDate() + 1);
      return;
    }

    //render slot in the calendar
    let title = (!this.slot.pause ? "Créneau de " : "Pause de ");
    let evt = {
      title: title + DateUtils.formatHours(hs) + ":" + DateUtils.formatHours(ms) + " à " + DateUtils.formatHours(he) + ":" + DateUtils.formatHours(me),
      start: start,
      end: end,
      //allDay is bugged, must be false
      allDay: false,
      //description: 'ici je peux mettre une description de l\'offre',
      backgroundColor: '#64bd63',
      textColor: '#fff',
      pause: this.slot.pause
    };
    if (title) {
      this.$calendar.fullCalendar('renderEvent',
        evt,
        true // make the event "stick"
      );
      this.addEvent(evt);
      this.addSlot('');
    }
    this.$calendar.fullCalendar('unselect');
    jQuery('#create-event-modal').modal('hide');
    this.resetSlotModal();
  }

  pushSlotInCalendar(slot) {

    let evt = {
      title: "Créneau Périodique",
      start: slot.from,
      end: slot.to,
      allDay: false,
      // description: 'ici je peux mettre une description de l\'offre',
      backgroundColor: '#64bd63',
      textColor: '#fff'
    };

    this.$calendar.fullCalendar('renderEvent',
      evt, true // make the event "stick"
    );

    this.addEvent(evt);
    this.$calendar.fullCalendar('unselect');
    this.resetSlotModal();

    return true;
  }

  dragSlot(event, revertFunc) {
    this.slot.date = event.start._d;
    this.slot.dateEnd = event.end._d;
    this.slot.startHour = event.start._d;
    this.slot.endHour = event.end._d;
    this.slot.pause = event.pause;
    let evs = this.$calendar.fullCalendar('clientEvents');
    let slotsForDragEv = this.offersService.getSlotsForDraggingEvent(evs, this.slots);
    if (slotsForDragEv && slotsForDragEv.length > 0) {
      if (!this.checkHour(slotsForDragEv, this.slot)) {
        this.slot = new CalendarSlot();
        revertFunc();
        return;
      }
      this.slots = [];
      this.slots = this.convertEventsToSlots(evs);
      if (this.obj != "detail") {
        this.resetSlotModal();
      } else {
        this.slots = [];
        this.slots = this.offersService.convertSlotsForSaving(this.slots);
        this.addSlot("drop");
      }
    } else {
      this.resetSlotModal();
      revertFunc();
      return;
    }
  }

  resetSlotModal() {
    this.resetDatetime('slotEHour');
    this.resetDatetime('slotSHour');
    this.slot = new CalendarSlot();
    this.alertsSlot = [];
    this.isFulltime = false;
    this.isPause = false;
  }

  closeModal() {
    this.resetSlotModal();
    jQuery('#create-event-modal').modal('hide');
  }

  closeDetailsModal() {
    this.alertsSlot = [];
    jQuery('#show-event-modal').modal('hide');
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }
}
