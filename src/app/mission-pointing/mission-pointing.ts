import {Widget} from '../core/widget/widget';
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';

import {GlobalConfigs} from "../configurations/globalConfigs";

import {SharedService} from "../../providers/shared.service";
import {MissionService} from "../../providers/mission-service";
import {FinanceService} from "../../providers/finance.service";
import {ContractService} from '../../providers/contract-service';

import {DateConverter} from '../../pipes/date-converter/date-converter';
import {TimeConverter} from '../../pipes/time-converter/time-converter';

@Component({
	selector: '[mission-pointing]',
	template: require('./mission-pointing.html'),
	styles: [require('./mission-pointing.scss')],
	pipes: [DateConverter, TimeConverter],
	providers: [ContractService, SharedService, MissionService, FinanceService, GlobalConfigs],
	directives: [ROUTER_DIRECTIVES, AlertComponent, Widget, NKDatetime, BUTTON_DIRECTIVES],
})
export class MissionPointing {
	// TODO Set dynamically
	projectTarget: string = 'employer';
	isEmployer: boolean;
	themeColor: string;

	contract: any;
	missionDetailsTitle: string;

	missionIndex: number;
	missionDayIndex: number;
	missionTimeIsFirst: boolean;
	missionTimeIsStart: boolean;

	//records of user_heure_mission of a contract
	missionHours = [];
	initialMissionHours = [];

	//two dimensional array of pauses of mission days
	isNewMission = true;
	contractSigned = false;

	store: Storage;
	invoiceReady: boolean = false;

	rating: number = 0;
	starsText: string = '';
	db: Storage;

	optionMission: string;
	backgroundImage: string;

	enterpriseName: string = "--";
	jobyerName: string = "--";
	currentUser: any;

	/*
		*   Invoice management
	*/
	invoiceId: number;
	isInvoiceAvailable: boolean = false;
	isReleveAvailable: boolean = false;

	alerts: Array<Object>;

	scheduleStartStatus: string = '-1';
	scheduleEndStatus: string = '-1';

	missionPauses = [];

	pointingClassSwitch = {'non': 'success', 'oui': 'danger'};

	disableBtnPointing;
	nextPointing;


	constructor(private route: ActivatedRoute,
	private sharedService: SharedService,
	private missionService: MissionService,
	private financeService: FinanceService,
	private router: Router) {
		// Retrieve the project target
		this.currentUser = this.sharedService.getCurrentUser();
		this.isEmployer = this.currentUser.estEmployeur;
		this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');

		//get missions
		this.contract = this.sharedService.getCurrentMission();


		//retrieve mission hours of today
		this.missionService.listMissionHours(this.contract, true).then((data: any) => {
			if(data.data){
				let missionHoursTemp = data.data;
				let array = this.missionService.getTodayMission(missionHoursTemp);
				this.missionHours = array[0];
				this.missionPauses = array[1];
				this.disableBtnPointing = this.missionService.disablePointing(this.missionHours, this.missionPauses).disabled;
				this.nextPointing = this.missionService.disablePointing(this.missionHours, this.missionPauses).nextPointing;
				/*let autoPointing = navParams.get('autoPointing');
					if(autoPointing){
					this.nextPointing = navParams.get('nextPointing')
					this.pointHour(true);
				}*/
			}
		});
	}

	pointHour(autoPointing){
		if(this.nextPointing){
			let h = new Date().getHours();
			let m = new Date().getMinutes();
			let minutesNow = this.missionService.convertHoursToMinutes(h+':'+m);
			this.nextPointing.pointe = minutesNow;
			this.missionService.savePointing(this.nextPointing).then((data: any) => {
				//retrieve mission hours of tody
				this.missionService.listMissionHours(this.contract, true).then((data: any) => {
					if(data.data){
						let missionHoursTemp = data.data;
						let array = this.missionService.getTodayMission(missionHoursTemp);
						this.missionHours = array[0];
						this.missionPauses = array[1];
						this.disableBtnPointing = true;
					}
				});
			});
		}
	}

	upperCase(str) {
		if (str == null || !str)
		return '';
		return str.toUpperCase();
	}

	isEmpty(str) {
		if (str == '' || str == 'null' || !str)
		return true;
		else
		return false;
	}

	/**
		* Return to the list page in order to refresh all data
	*/
	navigationPreviousPage() {
		this.router.navigate(['app/mission/list']);
	}
}
