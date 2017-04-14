import {AbstractGCallout} from "./generium/abstract-gcallout";

export class Advert extends AbstractGCallout{

  id: number;
  idEntreprise: number;
  titre: string;
  link: string;
  description: string;
  briefContent: string;
  thumbnail : {
    'class':'com.vitonjob.annonces.Attachement',
    code : number,
    status : string,
    fileContent : string,
    fileName: string
  };
  imgbg: {
    'class':'com.vitonjob.annonces.Attachement',
    code : number,
    status : string,
    fileContent : string,
    fileName: string
  };
  isThumbnail : boolean;
  rubriques: any[];
  created: string;
  offerId: number;
  nbInterest: number;
  isPartialTime: boolean;
  contractForm: string;

  constructor() {
    super('com.vitonjob.annonces.Annonce');

    this.id = 0;
    this.idEntreprise = 0;
    this.titre = "";
    this.link = "";
    this.description = "";
    this.briefContent = "";
    this.thumbnail = {
      'class':'com.vitonjob.annonces.Attachement',
        code : 0,
        status : "",
        fileContent : "",
        fileName: ""
    };
    this.imgbg = {
        'class':'com.vitonjob.annonces.Attachement',
        code : 0,
        status : "",
        fileContent : "",
        fileName: ""
    };
    this.isThumbnail = false;
    this.rubriques = [];
    this.created = "";
    this.offerId = 0;
    this.nbInterest = 0;
    this.isPartialTime = false;
    this.contractForm = "";
  }
}
