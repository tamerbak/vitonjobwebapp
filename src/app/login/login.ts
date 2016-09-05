import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {LoadListService} from "../providers/load-list.service";

@Component({
  directives: [
    ROUTER_DIRECTIVES
  ],
  selector: '[login]',
  host: {
    class: 'login-page app'
  },
  template: require('./login.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  providers: [LoadListService]
})
export class LoginPage {
	index: number;
	phone: number;
	email: string; 
	password1: string;
	password2: string;
	pays = [];
	
	isIndexValid =true;
	isPhoneNumValid = true;
	showEmailField: boolean;
	emailExist = false;
	isRecruteur : boolean = false;
	
	libelleButton: string;
	
	constructor(private loadListService: LoadListService) {
		
	}
	
	ngOnInit(): void {
		this.index = 33;
		this.libelleButton = "Se connecter";
		//load countries list
		this.loadListService.loadCountries('employer').then((data) => {
			this.pays = data.data;
		});
		
	}
	
	authenticate(){
		console.log("yataaaaa");
	}
}
