import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
declare var jQuery: any;
declare var moment: any;
declare var require;

@Component({
  selector: '[extra-calendar]',
  template: require('./extra-calendar.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./extra-calendar.scss')]
})
export class ExtraCalendar {
  calendar: any;
  $calendar: any;
  dragOptions: Object = { zIndex: 999, revert: true, revertDuration: 0 };
  event: any = {};
  createEvent: any;
  offer:any = {};
  isOfferToAdd:boolean = false;

  constructor(private route: ActivatedRoute) {
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();

    //get params
    this.route.params.forEach((params: Params) => {
      this.offer = params['offer'];
      this.isOfferToAdd = params['isOfferToAdd'];
    });

    this.calendar = {
      header: {
        left: '',
        center: '',
        right: ''
      },
      axisFormat: 'H:mm',
      slotDuration: '00:15:00',
      allDayText:"Au-delà d'un seul jour",
      events: [
        /*{
          title: 'All Day Event',
          start: new Date(y, m, 1),
          backgroundColor: '#79A5F0',
          textColor: '#fff',
          description: 'Will be busy throughout the whole day'
        },
        {
          title: 'Long Event',
          start: new Date(y, m, d + 5),
          end: new Date(y, m, d + 7),
          description: 'This conference should be worse visiting'
        },
        {
          id: 999,
          title: 'Blah Blah Car',
          start: new Date(y, m, d - 3, 16, 0),
          allDay: false,
          description: 'Agree with this guy on arrival time'
        },
        {
          id: 1000,
          title: 'Buy this template',
          start: new Date(y, m, d + 3, 12, 0),
          allDay: false,
          backgroundColor: '#555',
          textColor: '#fff',
          description: 'Make sure everything is consistent first'
        },
        {
          title: 'Got to school',
          start: new Date(y, m, d + 16, 12, 0),
          end: new Date(y, m, d + 16, 13, 0),
          backgroundColor: '#64bd63',
          textColor: '#fff',
          description: 'Time to go back'
        },
        {
          title: 'Study some Node',
          start: new Date(y, m, d + 18, 12, 0),
          end: new Date(y, m, d + 18, 13, 0),
          backgroundColor: '#79A5F0',
          textColor: '#fff',
          description: 'Node.js is a platform built on Chrome\'s JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.'
        },
        {
          title: 'Click for Flatlogic',
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
          url: 'http://flatlogic.com/',
          backgroundColor: '#e5603b',
          textColor: '#fff',
          description: 'Creative solutions'
        }*/
      ],
      selectable: true,
      selectHelper: true,
      select: (start, end, allDay): void => {
        this.createEvent = () => {
          let title = this.event.title;
          if (title) {
            this.$calendar.fullCalendar('renderEvent',
              {
                title: title,
                start: start,
                end: end,
                allDay: allDay,
                backgroundColor: '#64bd63',
                textColor: '#fff'
              },
              true // make the event "stick"
            );
          }
          this.$calendar.fullCalendar('unselect');
          jQuery('#create-event-modal').modal('hide');
        };

        jQuery('#create-event-modal').modal('show');
      },
      eventClick: (event): void => {
        this.event = event;
        jQuery('#show-event-modal').modal('show');
        debugger;
      },
      editable: true,
      droppable: true,

      drop: (date, event): void => { // this function is called when something is dropped
        // retrieve the dropped element's stored Event Object
        let originalEventObject = {
          title: jQuery.trim(jQuery(event.target).text()) // use the element's text as the event title
        };

        // we need to copy it, so that multiple events don't have a reference to the same object
        let copiedEventObject = jQuery.extend({}, originalEventObject);

        // assign it the date that was reported
        copiedEventObject.start = date;
        copiedEventObject.allDay = !date.hasTime();

        let $categoryClass = jQuery(event.target).data('event-class');
        if ($categoryClass) { copiedEventObject.className = [$categoryClass]; }

        // render the event on the calendar
        // the last `true` argument determines if the event 'sticks' (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
        this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);

        jQuery(event.target).remove();

      },
      lang : 'fr'
    };
    
    if (this.isOfferToAdd) {
      if (this.offer) {
        this.calendar.events.push({
          id: this.offer.id,
          title: this.offer.titre,
          start: new Date(y, m, d + 16, 12, 0),
          end: new Date(y, m, d + 16, 13, 0),
          backgroundColor: '#64bd63',
          textColor: '#fff',
          description: 'Time to go back'
        }); 
      }
    }
  };

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

  ngOnInit(): void {
    this.$calendar = jQuery('#calendar');
    this.$calendar.fullCalendar(this.calendar);
    jQuery('.draggable').draggable(this.dragOptions);
  }
}

