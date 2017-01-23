import {AbstractGCallout} from "./generium/abstract-gcallout";

export class CalendarSlot extends AbstractGCallout {
  'class': string;
  idCalendar: number;
  date: string;     // yyyy-mm-dd 00:00:00+00
  dateEnd: string;  // yyyy-mm-dd 00:00:00+00
  startHour: number;
  endHour: number;
  type: string;
  pause: boolean;

  constructor() {
    super('com.vitonjob.callouts.offer.model.CalendarData');

    this.idCalendar = 0;
    this.date = '';
    this.dateEnd = '';
    this.startHour = -1;
    this.endHour = -1;
    this.type = '';
    this.pause = false;
  }
}
