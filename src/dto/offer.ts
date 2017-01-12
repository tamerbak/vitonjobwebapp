/**
 * Created by kelvin on 09/01/2017.
 */

import {Job} from "./job";
import {CalendarSlot} from "./calendar-slot";

export class Offer {
  'class': string;
  idOffer: number;
  title: string;

  videolink: string;
  jobData: Job;
  parametrageConvention: number;

  calendarData: any[];
  qualityData: any[];
  languageData: any[];

  visible: boolean;
  telephone: string;
  contact: string;
  status: string;
  nbPoste: number;
  etat: string;
  rechercheAutomatique: boolean;
  obsolete: boolean;
  identity: number;
  adresse: string;
  jobyerId: number;
  entrepriseId: number;

  constructor() {
    this.class  = 'com.vitonjob.callouts.offer.model.OfferData';

    this.idOffer = 0;
    this.jobData = null;
    this.parametrageConvention = 0;
    this.calendarData = [];
    this.qualityData = [];
    this.languageData = [];
    this.visible = false;
    this.title = "";
    this.status = "open";
    this.videolink = "";
    this.nbPoste = 1;
    this.telephone = "";
    this.contact = "";
    this.etat = "";
    this.rechercheAutomatique = false;
    this.obsolete = false;
    this.identity = 0;
    this.adresse = "";
    this.jobyerId = 0;
    this.entrepriseId = 0;
  }
};
