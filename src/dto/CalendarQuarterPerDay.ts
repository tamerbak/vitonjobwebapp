import {CalendarQuarter} from "./calendar-quarter";
/**
 * Created by kelvin on 20/02/2017.
 */

export class CalendarQuarterPerDay {

  public slotsPerDay : {
    date: string,
    quarters: number[]
  }[];

  constructor() {
    this.slotsPerDay = [];
  }

  getDateKey(date: CalendarQuarter): string {
    let stringDate: string = date.getFullYear()
        + '-' + (date.getMonth() + 1)
        + '-' + date.getDate()
      ;
    return stringDate;
  }

  /**
   * Add a new quart into the array
   *
   * @param slotsPerDay
   * @param newQuart
   */
  pushQuart(newQuart: CalendarQuarter): void {
    let dateKey: string = this.getDateKey(newQuart);

    let slot;
    let slots = this.slotsPerDay.filter((s) => {
      return (s.date == dateKey);
    });

    let index =
      (newQuart.getHours() * 4) // 4 quarters per hour
      + newQuart.getMinutes() / 15 // 15 minutes to get a quarter
    ;

    if (slots.length > 0) {
      slot = slots[0];
      slot.quarters[index] = 0;
    } else {

      // Generate a full day of quarters
      let quarters = [];
      for (let i = 0; i < 24 * 4; ++i) {
        quarters.push(null);
      }
      // Retrieve the quarter id of the new quarter
      quarters[index] = 0;

      slot = {
        date: dateKey,
        quarters: quarters
      };
      this.slotsPerDay.push(slot);
    }
  }
}
