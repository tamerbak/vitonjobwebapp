import {CalendarQuarter} from "./calendar-quarter";
/**
 * Created by kelvin on 20/02/2017.
 */

/**
 * Represent a planning
 */
export class CalendarQuarterPerDay {

  /**
   * quartersPerDay: Each line of the planning is formed by :
   * - the date as a string
   * - the array of 24 * 4 quarters (because their is 24 hour per day and 5 quarter per hour)
   *   - The content of each quarter cans be :
   *     - NULL : The quarter is empty
   *     - 0 : The quarter is used (Required for employer and available for jobyer)
   *     - number > 0 : The quarter is assigned to someone (number on that case is the id of the assigned)
   */
  public quartersPerDay: {
    date: string,
    quarters: number[]
  }[];

  /**
   * Constructor
   */
  constructor() {
    this.quartersPerDay = [];
  }

  /**
   * Return the date into string
   *
   * @param date
   * @returns {string}
   */
  static getDateKey(date: CalendarQuarter): string {
    let stringDate: string;
    stringDate = date.getFullYear()
      + '-' + (date.getMonth() + 1)
      + '-' + date.getDate()
    ;
    return stringDate;
  }

  /**
   * Add a new quart into the planning
   *
   * @param newQuart
   */
  pushQuart(newQuart: CalendarQuarter): void {

    // Get the date with a string format
    let dateKey: string = CalendarQuarterPerDay.getDateKey(newQuart);

    let slot;
    let slots = this.quartersPerDay.filter((s) => {
      return (s.date == dateKey);
    });

    let index =
        (newQuart.getHours() * 4) // 4 quarters per hour
        + newQuart.getMinutes() / 15 // 15 minutes to get a quarter
      ;

    // If the line (day) already exists, just initialize the quarter as 0
    if (slots.length > 0) {
      slot = slots[0];
      slot.quarters[index] = 0;
    } else {

      // Generate a full day of quarters
      let quarters = [];
      for (let i = 0; i < 24 * 4; ++i) {
        // Set NULL in order to say not initialized
        quarters.push(null);
      }
      // Retrieve the quarter id of the new quarter
      quarters[index] = 0;

      slot = {
        date: dateKey,
        quarters: quarters
      };
      this.quartersPerDay.push(slot);
    }
  }
}
