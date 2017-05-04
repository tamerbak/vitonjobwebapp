import {Utils} from "./utils";
declare let moment: any;

export class DateUtils{

  constructor() {
  }

  public static getAge(birthDate) {
    var ageDifMs = Date.now() - new Date(birthDate).getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }

  public static rfcFormat(strDate) {
    let monthsDico: Dictionary = {
      "janvier": "Jan",
      "février": "Feb",
      "mars": "Mar",
      "avril": "Apr",
      "mai": "May",
      "juin": "Jun",
      "juillet": "Jul",
      "aout": "Aug",
      "septembre": "Sep",
      "octobre": "Oct",
      "novembre": "Nov",
      "décembre": "Dec"
    };
    for (let i = 0; i < Object.keys(monthsDico).length; i++) {
      let key = Object.keys(monthsDico)[i];
      if (strDate.indexOf(key) != -1) {
        strDate = strDate.replace(key, monthsDico[key]);
        return strDate;
      }
    }
  }

  public static sqlfy(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 00:00:00+00";
  }

  public static sqlfyWithHours(d: Date) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":00+00";
  }

  public static toDateString(date) {
    if (Utils.isEmpty(date)) {
      return "";
    }
    let d = new Date(date);
    let str = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return str;
  }

  public static toFrenchDateString(date: number) {
    let dateOptions = {
      weekday: "long", month: "long", year: "numeric",
      day: "numeric"//, hour: "2-digit", minute: "2-digit"
    };
    return new Date(date).toLocaleDateString('fr-FR', dateOptions);
  }

  /**
   * @Description Converts a timeStamp to date string
   * @param time : a timestamp date
   */
  public static toHourString(time: number) {
    let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
    let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
    return hours + ":" + minutes;
  }

  public static parseDate(dateStr: string) {
    if (!dateStr || dateStr.length == 0 || dateStr.split('-').length == 0)
      return '';
    return dateStr.split('-')[2] + '/' + dateStr.split('-')[1] + '/' + dateStr.split('-')[0];
  }

  public static dateToSqlTimestamp(date: Date) {
    if (!date) {
      date = new Date();
    }
    var sqlTimestamp = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' +
      ('00' + date.getUTCHours()).slice(-2) + ':' +
      ('00' + date.getUTCMinutes()).slice(-2) + ':' +
      ('00' + date.getUTCSeconds()).slice(-2);
    return sqlTimestamp;
  }

  public static displayableDateToSQL(sdate: string) {
    if (!sdate || sdate.length == 0) {
      return 'null';
    }

    let day = sdate.split('/')[0];
    let month = sdate.split('/')[1];
    let year = sdate.split('/')[2];

    return "'" + year + "-" + month + "-" + day + " 00:00:00+00'";
  }


  /**
   * @description convert time String to minutes
   * @param timeStr 'hh:mm'
   */
  public static timeStrToMinutes(timeStr: string) {
    if (!timeStr || timeStr.length == 0 || timeStr.split(':').length == 0 || timeStr == 'undefined') {
      return 0;
    }
    var timeParts = timeStr.split(':');
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);

    var totalMinutes = minutes + hours * 60;
    return totalMinutes;
  }

  public static dateFormat(d) {
    if (!d || typeof d === 'undefined')
      return '';
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;
    return sd;
  }

  public static getMinutesFromDate(d) {
    if (Utils.isEmpty(d) || typeof(d) != "object") {
      return 0;
    }
    let h = d.getHours() * 60;
    let m = d.getMinutes() * 1;
    return h + m;
  }

  public static getFormattedHourFromDate(date: Date) {
    if (Utils.isEmpty(date)) {
      return "--:--";
    }
    let h = date.getHours();
    let m = date.getMinutes();
    return h + ":" + (m < 10 ? ('0' + m) : m);
  }

  public static formatHours(hours) {
    return (hours < 10 ? ('0' + hours) : hours);
  }

  public static simpleDateFormat(d: Date) {
    if (Utils.isEmpty(d)) {
      return '';
    }
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = (da < 10 ? '0' : '') + da + '/' + (m < 10 ? '0' : '') + m + "/" + d.getFullYear();
    return sd
  }

  public static setMinutesToDate(d: Date, min: number): Date {
    if (Utils.isEmpty(d)) {
      return null;
    }

    let minutes = min % 60;
    let hours = Math.trunc(min / 60);

    d.setHours(hours, minutes);
    return d;
  }

  public static convertToFormattedDateHour(d: Date){
    if(!this.isDateValid(d)){
      return "";
    }

    let sd = this.simpleDateFormat(d);
    let hm = this.getFormattedHourFromDate(d);
    return sd + " à " + hm;
  }

  //date = "24/03/1987 à 5:00"
  public static reconvertFormattedDateHour(date: string){
    if(Utils.isEmpty(date) || !date.split(" à ") || date.split(" à ").length != 2){
      return;
    }

    let dateArray = date.split(" à ");
    let parsedDate = this.displayableDateToSQL(dateArray[0]);
    let timeArray = dateArray[1].split(":");
    let d = new Date(parsedDate).setHours(+timeArray[0], +timeArray[1]);
    return new Date(d);
  }

  public static isDateValid(d: Date){
    if(Utils.isEmpty(d) || isNaN(d.getTime())){
      return false;
    }else{
      return true;
    }
  }
  //t = "10:45"
  public static isTimeValid(t: string){
    if(Utils.isEmpty(t) || t.split(":").length != 2){
      return false;
    }else{
      return true;
    }
  }

  public static isInSameWeek(d1: Date, d2: Date){
    //la semaine commence par lundi et se termine à dimanche
    //obligatoire de laisser le toISOString() sinon isSame renvoie tjrs false
    let isInSameWeek = moment(d1.toISOString()).isSame(d2.toISOString(), 'week');
    return isInSameWeek;
  }

  public static diffBetweenTwoDatesInMinutes(dateEnd: Date, dateStart: Date): number{
    let milliSec = dateEnd.getTime() - dateStart.getTime();
    return Math.floor(milliSec / (60 * 1000));
  }

  public static convertToDate(d:string){
    return new Date(d);
  }

}

interface Dictionary {
   [ key: string ]: string
}
