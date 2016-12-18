import {Utils} from "./utils";
export class DateUtils {

  constructor() {
  }

  public static getAge(birthDate) {
    var ageDifMs = Date.now() - new Date(birthDate).getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }

  public static rfcFormat(strDate){
    let monthsDico: Dictionary = {"janvier": "Jan",  "février": "Feb", "mars": "Mar", "avril": "Apr", "mai": "May", "juin": "Jun", "juillet": "Jul", "aout": "Aug", "septembre": "Sep", "octobre": "Oct", "novembre": "Nov", "décembre": "Dec"};
    for(let i = 0; i < Object.keys(monthsDico).length; i++){
      let key = Object.keys(monthsDico)[i];
      if(strDate.indexOf(key) != -1){
        strDate = strDate.replace(key, monthsDico[key]);
        return strDate;
      }
    }
  }

  public static sqlfy(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 00:00:00+00";
  }

  public static toDateString(date) {
    let d = new Date(date);
    let str = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    return str;
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
    if(!date){
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

  public static displayableDateToSQL(sdate : string){
    if(!sdate || sdate.length == 0){
      return 'null';
    }

    let day = sdate.split('/')[0];
    let month = sdate.split('/')[1];
    let year = sdate.split('/')[2];

    return "'"+year+"-"+month+"-"+day+" 00:00:00+00'";
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
    if(!d || typeof d === 'undefined')
      return '';
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;
    return sd;
  }

  public static getMinutesFromDate(d){
    if(Utils.isEmpty(d)){
      return 0;
    }
    let h = d.getHours() * 60;
    let m = d.getMinutes() * 1;
    return h + m;
  }

  public static formatHours(hours){
    return (hours < 10 ? ('0' + hours) : hours);
  }
}

  interface Dictionary {
  [ key: string ]: string
}
