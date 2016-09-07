import {Component} from '@angular/core';
import {SharedService} from "../../providers/shared.service";

declare var jQuery: any;

@Component({
	selector: '[modal-component]',
	template: require('./modal-component.html')
})
export class ModalComponent {
	displayedMsg: string;
	currentUser: any;

	constructor(private sharedService: SharedService){
		this.currentUser = this.sharedService.getCurrentUser();
		if(this.currentUser){
			if(this.currentUser.phone){
				if(this.currentUser.email){
					this.displayedMsg = "Votre mot de passe est sur le point d'être réinitialisé. Voulez-vous le recevoir par SMS ou par email?";
				}else{
					this.displayedMsg = "Le numéro que vous avez saisi ne correspond à aucun compte enregistré. Veuillez créer un compte.";
				}	
			}else{
				this.displayedMsg = "Veuillez saisir un numéro de téléphone valide.";
			}
		}
	}
	
	/*ok(): void {
		jQuery('#my-modal18-content').modal('hide');
	}*/
	
	sendSMS(){
		
	}
	
	sendEmail(){
		
	}
	
	/*passwordForgotten(canal, email){
		var tel = "+" + this.index + this.phone;
		this.authService.setNewPassword(tel).then((data) => {
		if (!data) {
		loading.dismiss();
		this.globalService.showAlertValidation("VitOnJob", "Serveur non disponible ou problème de connexion.");
		return;
		}
		if (data && data.password.length != 0) {
		let newPasswd = data.password;
		if(canal == 'sms'){
		this.authService.updatePasswordByPhone(tel, md5(newPasswd)).then((data) => {
		if (!data) {
		loading.dismiss();
		this.globalService.showAlertValidation("VitOnJob", "Serveur non disponible ou problème de connexion.");
		return;
		}
		this.authService.sendPasswordBySMS(tel, newPasswd).then((data) => {
		if (!data || data.status != 200) {
		loading.dismiss();
		this.globalService.showAlertValidation("VitOnJob", "Serveur non disponible ou problème de connexion.");
		return;
		}
		loading.dismiss();
		//this.globalService.showAlertValidation("VitOnJob", "Votre mot de passe a été réinitialisé. Vous allez le recevoir par SMS.");
		});
		});
		}
		else{
		this.authService.updatePasswordByMail(email, md5(newPasswd)).then((data) => {
		if (!data) {
		loading.dismiss();
		this.globalService.showAlertValidation("VitOnJob", "Serveur non disponible ou problème de connexion.");
		return;
		}
		this.authService.sendPasswordByEmail(email, newPasswd).then((data) => {
		if (!data || data.status != 200) {
		loading.dismiss();
		this.globalService.showAlertValidation("VitOnJob", "Serveur non disponible ou problème de connexion.");
		return;
		}
		loading.dismiss();
		//this.globalService.showAlertValidation("VitOnJob", "Votre mot de passe a été réinitialisé. Vous allez le recevoir par email.");
		});
		});
		}
		}
		})
	}*/
}

