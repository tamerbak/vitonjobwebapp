import {Job} from "./job";
import {AbstractGCallout} from "./generium/abstract-gcallout";
import {Equipment} from "./equipment";
import {Requirement} from "./requirement";
import {Address} from "./address";

export class Offer extends AbstractGCallout {
  'class': string;
  idParentOffer: number;
  idOffer: number;
  title: string;

  videolink: string;
  jobData: Job;
  parametrageConvention: number;

  calendarData: any[];
  qualityData: any[];
  languageData: any[];
  requirementData: Requirement[];
  equipmentData: Equipment[];

  visible: boolean;
  telephone: string;
  contact: string;
  status: string;
  nbPoste: number;
  etat: string;
  rechercheAutomatique: boolean;
  obsolete: boolean;
  identity: number;
  adresse: Address;
  jobyerId: number;
  entrepriseId: number;

  constructor() {
    super('com.vitonjob.callouts.offer.model.OfferData');

    this.idParentOffer = 0;
    this.idOffer = 0;
    this.jobData = new Job();
    this.parametrageConvention = 0;
    this.calendarData = [];
    this.qualityData = [];
    this.languageData = [];
    this.requirementData = [];
    this.equipmentData = [];
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
    this.jobyerId = 0;
    this.entrepriseId = 0;

    this.adresse = new Address();
    this.adresse.type = 'adresse_de_travail';
  }
}
;
