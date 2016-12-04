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

  public static formatHours(hours){
    return (hours < 10 ? ('0' + hours) : hours);
  }
}

  interface Dictionary {
  [ key: string ]: string
}
