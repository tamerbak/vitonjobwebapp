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

declare let Messenger, jQuery: any;
declare let google: any;
declare let moment: any;
declare let require;

class CalendarEvent {
  title: string;
  start: number;
  end: number;

  // The displayed slot used the end date to finish the slot, so we need to add 24h to correct slot display
  displayEnd: number;
  allDay: boolean;
  description: string;
  backgroundColor: string;
  textColor: string;
  pause: boolean;

  constructor(isNew?: boolean) {

    this.title = '';
    this.start = 0;
    this.end = 0;
    this.displayEnd = 0;
    this.allDay = false;
    this.description = '';
    this.backgroundColor = '';
    this.textColor = '';
    this.pause = false;

    if (isNew === true) {
      this.backgroundColor = '#64bd63';
      this.textColor = '#fff';
    }
  }

  setStartHour(hour: number): void {
    this.start = hour;
  }

  setEndHour(hour: number): void {
    this.end = hour + 3600000;
    this.displayEnd = hour;
  }
}

/**
 * Integration of fullCalendar JS
 *
 * Source: https://fullcalendar.io/docs/
 */
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
  nbPoste: number = 1;

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
        this.calendar.events = this.convertDetailSlotsForCalendar();
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

  /**
   * Remove a slot
   *
   * @param event
   */
  removeSlot(event) {
    let self = this;

    if (this.slots.length == 1) {
      this.addAlert(
        "danger",
        "Une offre doit avoir au moins un créneau de " + (this.projectTarget == 'jobyer' ? 'disponibilité.' : 'travail souhaité.') +
        "Veuillez ajouter un autre créneau avant de pouvoir supprimer celui-ci.",
        "slot"
      );
      return;
    }

    // Searching event in the calendar events
    let ev = this.calendar.events.filter((e)=> {
        return (e.start == event.start._d.getTime() && e.end == event.end._d.getTime());
    });

    let index = this.calendar.events.indexOf(ev[0]);
    if (index != -1) {
      //Removing event from calendar
      this.calendar.events.splice(index, 1);

      // Render the calendar with the event removed
      this.$calendar.fullCalendar('removeEvents', (e)=> {
        return (e.start == event.start._d.getTime() && e.end == event.end._d.getTime());
      });

      // Remove slot from local
      this.slots.splice(index, 1);
    }

    this.closeDetailsModal();
  }

  /**
   * Forge well formatted calendar slot and add it the the slots list
   *
   * @param ev
   * @param newSlot
   */
  addSlot(ev, newSlot) {

    if (this.slot.startHour == 0 || this.slot.endHour == 0) {
      return;
    }

    if (this.obj != "detail" || ev != 'drop') {

      let slotClone = this.offersService.cloneSlot(newSlot);
      let slotToSave = this.offersService.convertSlotsForSaving([slotClone]);

      if (slotToSave[0]) {
        let slot = new CalendarSlot();
        slot.date = new Date(slotToSave[0].date);
        slot.date.setHours(12);
        slot.date.setMinutes(0);
        slot.date.setSeconds(0);

        slot.dateEnd = new Date(slotToSave[0].dateEnd);
        slot.dateEnd.setHours(12);
        slot.dateEnd.setMinutes(0);
        slot.dateEnd.setSeconds(0);

        slot.endHour = slotToSave[0].endHour;
        slot.pause = slotToSave[0].pause;
        slot.startHour = slotToSave[0].startHour;
        this.slots.push(slot);
      }
    }
  }

  convertDetailSlotsForCalendar() {
    let events = [];
    if (this.slots) {
      for (let i = 0; i < this.slots.length; i++) {

        let isPause = this.slots[i].pause;
        let startHour = this.toHourString(this.slots[i].startHour);
        let endHour = this.toHourString(this.slots[i].endHour);
        let startDate = new Date(this.slots[i].date);
        let endDate = new Date(this.slots[i].dateEnd);
        let displayEndDate = new Date(this.slots[i].dateEnd);

        startDate.setHours(+startHour.split(":")[0], +startHour.split(":")[1], 0, 0);
        endDate.setHours(+endHour.split(":")[0], +endHour.split(":")[1], 0, 0);
        displayEndDate.setHours(+endHour.split(":")[0], +endHour.split(":")[1], 0, 0);

        let newCalendarEvt = new CalendarEvent();
        newCalendarEvt.title =
          (!isPause ? "Créneau de " : "Pause de ")
          + startHour + " à " + endHour
        ;
        newCalendarEvt.setStartHour(startDate.getTime());
        newCalendarEvt.setEndHour(endDate.getTime());
        newCalendarEvt.pause = isPause;

        this.$calendar.fullCalendar('renderEvent',
          newCalendarEvt,
          true // make the event "stick"
        );
        events.push(newCalendarEvt);
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

  /**
   * Control a new slot with current slots
   *
   * @param slots
   * @param slot
   * @returns {boolean}
   */
  checkHour(slots, slot) {
    this.alertsSlot = [];

    // Compute Minutes format start and end hour of the new slot
    let startHourH = new Date(slot.startHour).getHours();
    let startHourM = new Date(slot.startHour).getMinutes();
    let startHourTotMinutes = this.offersService.convertHoursToMinutes(startHourH + ':' + startHourM);
    let endHourH = new Date(slot.endHour).getHours();
    let endHourM = new Date(slot.endHour).getMinutes();
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
    if (slot.date >= slot.dateEnd) {
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
      this.slot.startHour = new Date(new Date().setHours(0, 0, 0, 0));
      this.slot.endHour = new Date(new Date().setHours(23, 59, 0, 0));
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

        // HACK: Calendar select automatically the day after you selection at midnight.
        // Force 1 day before to stay on the expected day
        this.endDate.setDate(this.endDate.getDate() - 1);

        // Set if single or multi day
        this.plageDate = (this.startDate.getTime() == this.endDate.getTime()) ? 'single' : 'multiple';
        // Set default periodicity
        this.isPeriodic = true;

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
      timezone: 'local',
      lang: 'fr'
    };
  }

  addSlotInCalendar(start, end, allDay): void {

    let newEvents: CalendarEvent[] = [];
    let newSlots = [];

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
    this.startDate.setHours(hs, ms, 0, 0);
    this.endDate.setHours(he, me, 0, 0);

    //slots should be coherent
    this.slot.date = start._d;
    this.slot.dateEnd = end._d;

    if (this.plageDate == "multiple" && this.isPeriodic) {

      this.isPeriodic = false; // setting back to false to prevent default
      let nbDays = Math.floor((this.endDate - this.startDate) / (60 * 60 * 24 * 1000)) + 1;

      // Boucle de splittage slots with fix for special dates
      for (let n = 0; n < (nbDays > 1 ? nbDays : nbDays + 1); n++) {

        // Compute day slot
        let slotStart = new Date(start);
        slotStart.setDate(slotStart.getDate() + n);
        let slotEnd = new Date(start);
        slotEnd.setDate(slotStart.getDate());
        slotEnd.setHours(he);
        slotEnd.setMinutes(me);

        let slot: any = {
          date: slotStart,
          dateEnd: slotEnd,
          startHour: hs * 60 + ms,
          endHour: he * 60 + me,
          pause: false,
          allDay: false
        };

        let newCalendarEvt = new CalendarEvent(true);
        newCalendarEvt.title =
          (!this.slot.pause ? "Créneau de " : "Pause de ")
          + DateUtils.formatHours(hs) + ":" + DateUtils.formatHours(ms)
          + " à " + DateUtils.formatHours(he) + ":" + DateUtils.formatHours(me)
        ;
        newCalendarEvt.setStartHour(slotStart.getTime());
        newCalendarEvt.setEndHour(slotEnd.getTime());
        newCalendarEvt.pause = this.slot.pause;

        for (let i = this.nbPoste; i > 0; --i) {
          newEvents.push(newCalendarEvt);
          newSlots.push(slot);
        }
      }

    } else {

      let newCalendarEvt = new CalendarEvent(true);
      newCalendarEvt.title =
        (!this.slot.pause ? "Créneau de " : "Pause de ")
        + DateUtils.formatHours(hs) + ":" + DateUtils.formatHours(ms)
        + " à " + DateUtils.formatHours(he) + ":" + DateUtils.formatHours(me)
      ;
      newCalendarEvt.setStartHour(new Date(start).getTime());
      newCalendarEvt.setEndHour(new Date(end).getTime());
      newCalendarEvt.pause = this.slot.pause;

      for (let i = this.nbPoste; i > 0; --i) {
        newEvents.push(newCalendarEvt);
        newSlots.push(this.slot);
      }
    }

    let failed = false;
    for (let i = 0; i < newSlots.length; ++i) {
      if (this.checkHour(this.slots, newSlots[i]) == false) {
        console.log('Slot NOK');
        this.addAlert("warning", " Certains créneaux que vous avez sélectionnés ne sont pas valides", "general");
        failed = true;
        break;
      }
    }

    if (failed === false) {
      for (let i = 0; i < newEvents.length; ++i) {
        this.$calendar.fullCalendar('renderEvent',
          newEvents[i],
          true // make the event "stick"
        );
        this.addEvent(newEvents[i]);
        this.addSlot('', newSlots[i]);
      }
      this.$calendar.fullCalendar('unselect');
      jQuery('#create-event-modal').modal('hide');
      this.resetSlotModal();
    }
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
        this.addSlot("drop", this.slot);
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
    this.nbPoste = 1;
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
