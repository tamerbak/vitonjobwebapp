import {Injectable} from '@angular/core';


@Injectable()
export class Utils {

    constructor() {}

    public static isValidName(name:string):boolean{
      var regEx = /^[A-Za-zÀ-ú.' \-\p{L}\p{Zs}\p{Lu}\p{Ll}']+$/;
      return regEx.test(name);
    }

    public static isEmpty(str){
  		if(str == '' || str == 'null' || !str)
  			return true;
  		else
  			return false;
  	}

}
