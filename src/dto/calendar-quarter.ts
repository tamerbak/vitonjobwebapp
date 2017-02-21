/**
 * Created by kelvin on 20/02/2017.
 */

export class CalendarQuarter {
  private hour: Date;
  private jobyerId: number;

  constructor(ts: number) {
    this.hour = new Date(ts);
    this.hour.setSeconds(0);
    this.hour.setMilliseconds(0);
  }

  setHours(value: any): void {
    this.hour.setHours(value);
  }
  getHours(): number {
    return this.hour.getHours();
  }

  setMinutes(value: any): void {
    this.hour.setMinutes(value);
  }
  getMinutes(): number {
    return this.hour.getMinutes();
  }

  getTime(): number {
    return this.hour.getTime();
  }
  getFullYear(): number {
    return this.hour.getFullYear();
  }
  getMonth(): number {
    return this.hour.getMonth();
  }
  getDay(): number {
    return this.hour.getDay();
  }

  assignTo(jobyerId) {
    this.jobyerId = jobyerId;
  }
  assignedTo(): number {
    return this.jobyerId;
  }
}
