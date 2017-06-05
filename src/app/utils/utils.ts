import {Injectable} from "@angular/core";
import {isEmpty} from "rxjs/operator/isEmpty";


@Injectable()
export class Utils {

  constructor() {
  }

  public static isValidName(name: string): boolean {
    var regEx = /^[A-Za-zÀ-ú.' \-\p{L}\p{Zs}\p{Lu}\p{Ll}']+$/;
    return regEx.test(name);
  }

  public static isValidIBAN(str: string): boolean {
    let CODE_LENGTHS = {
      AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
      CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
      FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
      HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
      LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
      MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
      RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
    };
    let iban = String(str).toUpperCase().replace(/[^A-Z0-9]/g, ''),
     code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/),
     digits;

    // check syntax and length
    if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
      return false;
    }
    // rearrange country code and check digits, and convert chars to ints
    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter:string) {
      return String(letter.charCodeAt(0) - 55);
    });
    // final check
    let check = Utils.mod97(digits);
    if (!str || str.length == 0)
      return true;
    if (check == false)
      return false;
    return check == 1;
  }

  public static isValidBIC(str: string): boolean {
    var regSWIFT = /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/;;
    return regSWIFT.test(str);
  }

  private static mod97(string) {
    let checksum = string.slice(0, 2), fragment;
    for (let offset = 2; offset < string.length; offset += 7) {
      fragment = String(checksum) + string.substring(offset, offset + 7);
      checksum = parseInt(fragment, 10) % 97;
    }
    return checksum;
  }

  public static getRawValueFromMask(e){
    let _regex = new RegExp('_', 'g');
    let _rawvalue = e.target.value.replace(_regex, '');

    return (_rawvalue === '' ? '' : _rawvalue).trim();
  }

  public static isEmpty(str) {
    if (str == '' || str == 'null' || !str || str == 'undefined')
      return true;
    else
      return false;
  }

  public static isNumber(char){
    let re = /^(0|[1-9][0-9]*)$/;
    return re.test(char);
  }

  public static isValidUrl(u){
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(u);
  }

  public static isEmailValid(email) {
    var EMAIL_REGEXP = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
    var isMatchRegex = EMAIL_REGEXP.test(email);
    return isMatchRegex;
  }

  public static preventNull(str){
    if(Utils.isEmpty(str)){
      return "";
    }else{
      return str;
    }
  }

  public static sqlfyText(txt) {
    if (!txt || txt.length == 0)
      return "";
    return txt.replace(/'/g, "''");
  }

  /*
  remove all spaces from a string
  ex: input = "tikchbila tiwliwla atikawa"
      output = "tikchbilatiwliwlaatikawa"
   */
  public static removeAllSpaces(str){
    if (this.isEmpty(str))
      return "";
    return str.replace(/\s+/g, '');
  }

  public static parseNumber(str) {
    try {
      return parseFloat(str);
    }
    catch (err) {
      return 0.0;
    }
  }

  public static formatSIREN(siren){
    let s1 = siren.substr(0, 3);
    let s2 = siren.substr(3, 3);
    let s3 = siren.substr(6, 3);
    return s1 + " " + s2 + " " + s3 + " ";
  }

  public static sameDay(date1:Date, date2:Date):boolean{
    let day1 = date1.getDay();
    let month1 = date1.getMonth();
    let year1 = date1.getFullYear();

    let day2 = date2.getDay();
    let month2 = date2.getMonth();
    let year2 = date2.getFullYear();

    return day1==day2
      && month1==month2
      && year1==year2;
  }

  public static copyKeyValues(srcObj, targetObj){
    // Copy every properties from src obj to target obj
    Object.keys(srcObj).forEach((key) => {
      targetObj[key] = this.preventNull(srcObj[key]);
    });
    return targetObj;
  }

  public static capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public static copyObjectByValue(obj: any){
    return JSON.parse(JSON.stringify(obj));
  }

  public static decimalAdjust(type, value, exp) {
    // Si la valeur de exp n'est pas définie ou vaut zéro...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si la valeur n'est pas un nombre
    // ou si exp n'est pas un entier...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Décalage
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Décalage inversé
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
}
