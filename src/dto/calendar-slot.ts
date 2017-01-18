/**
 * Created by kelvin on 10/01/2017.
 */

export class CalendarSlot {
  'class': string;
  idCalendar: number;
  date: string;     // yyyy-mm-dd 00:00:00+00
  dateEnd: string;  // yyyy-mm-dd 00:00:00+00
  startHour: number;
  endHour: number;
  type: string;
  pause: boolean;

  constructor() {
    this.class = 'com.vitonjob.callouts.offer.model.CalendarData';

    this.idCalendar = 0;
    this.date = '';
    this.dateEnd = '';
    this.startHour = -1;
    this.endHour = -1;
    this.type = '';
    this.pause = false;
  }
}
