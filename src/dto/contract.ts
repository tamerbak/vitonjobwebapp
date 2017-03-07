export class ContractData {

  id: number;
  num: string;
  centreMedecineEntreprise: string;
  adresseCentreMedecineEntreprise: string;
  centreMedecineETT: string;
  adresseCentreMedecineETT: string;
  contact: string;
  indemniteFinMission: string;
  indemniteCongesPayes: string;
  moyenAcces: string;
  periodesNonTravaillees: string;
  debutSouplesse: string;
  finSouplesse: string;
  equipements: string;

  interim: string;
  missionStartDate: string;
  missionEndDate: string;
  trialPeriod: number;
  termStartDate: string;
  termEndDate: string;
  motif: string;
  justification: string;
  qualification: string;
  characteristics: string;
  workTimeHours: number;
  workTimeVariable: number;
  usualWorkTimeHours: string;
  workHourVariable: string;
  postRisks: string;
  medicalSurv: string;
  epi: boolean;
  baseSalary: number;
  MonthlyAverageDuration: string;
  salaryNHours: string;
  salarySH35: string;
  salarySH43: string;
  restRight: string;
  interimAddress: string;
  customer: string;
  primes: number;
  headOffice: string;
  missionContent: string;
  category: string;
  sector: string;
  companyName: string;
  titreTransport: string;
  zonesTitre: string;
  risques: string;
  elementsCotisation: number;
  elementsNonCotisation: number;
  titre: string;
  periodicite: string;
  epiProvidedBy : string;
  isScheduleFixed: string;
  workStartHour: any;
  workEndHour: any;
  workAdress: string;
  adresseInterim: string;
  offerContact: string;
  contactPhone: string;

  //docusign infos
  partnerEmployerLink: string;
  partnerJobyerLink: string;
  demandeJobyer: string;
  demandeEmployer: string;
  enveloppeEmployeur: string;
  enveloppeJobyer: string;

  epiList: any[];
  prerequisObligatoires: any[];

  //jobyer infos
  jobyerId: number;
  jobyerNom: string;
  jobyerPrenom: string;
  jobyerNumSS: string;
  jobyerBirthDate: string;
  jobyerLieuNaissance: string;
  jobyerNationaliteLibelle: string;
  jobyerTitreTravail: string;
  jobyerDebutTitreTravail: string;
  jobyerFinTitreTravail: string;
  numeroTitreTravail: string;
  email: string;
  tel: string;

  //general contract infos
  isDraft: string;

  //offer infos
  prerequis: any[];

  constructor(){
    //default values
    this.interim = "HubJob.com";
    this.indemniteCongesPayes = "10.00 %";
    this.centreMedecineETT = "CMIE";
    this.adresseCentreMedecineETT = "4 rue de La Haye – 95731 ROISSY EN FRANCE";
    this.usualWorkTimeHours = "8H00/17H00 variables";

    this.id = 0;
    this.num = "";
    this.centreMedecineEntreprise = "";
    this.adresseCentreMedecineEntreprise = "";
    this.contact = "";
    this.indemniteFinMission = "10.00 %";
    this.moyenAcces = "";
    this.numeroTitreTravail = "";
    this.periodesNonTravaillees = "";
    this.debutSouplesse = "";
    this.finSouplesse = "";
    this.equipements = "";

    this.missionStartDate = "";
    this.missionEndDate = "";
    this.trialPeriod = 5;
    this.termStartDate = "";
    this.termEndDate = "";
    this.motif = "";
    this.justification = "";
    this.qualification = "";
    this.characteristics = "";
    this.isScheduleFixed = "true";
    this.workTimeVariable = 0;
    this.workStartHour = null;
    this.workEndHour = null;
    this.workHourVariable = "";
    this.postRisks = "";
    this.medicalSurv = "NON";
    this.epi = false;
    this.epiProvidedBy  = "";
    this.baseSalary = 0;
    this.MonthlyAverageDuration = "0";
    this.salaryNHours = "00,00€ B/H";
    this.salarySH35 = "+00%";
    this.salarySH43 = "+00%";
    this.restRight = "00%";
    this.interimAddress = "";
    this.customer = "";
    this.primes = 0;
    this.headOffice = "";
    this.missionContent = "";
    this.category = "Employé";
    this.sector = "";
    this.companyName = "";
    this.titreTransport = "NON";
    this.zonesTitre = "";
    this.risques = "";
    this.elementsCotisation = 0.0;
    this.elementsNonCotisation = 1.0;
    this.titre = "";
    this.periodicite = "";

    this.workTimeHours = 0;

    this.workAdress = "";


    this.adresseInterim = "";

    this.offerContact = "";
    this.contactPhone = "";

    this.epiList = [];
    this.prerequisObligatoires = [];

    //jobyerInfo
    this.jobyerId = 0;
    this.jobyerNom = "";
    this.jobyerPrenom = "";
    this.jobyerNumSS = "";
    this.jobyerBirthDate = "";
    this.jobyerLieuNaissance = "";
    this.jobyerNationaliteLibelle = "";
    this.jobyerTitreTravail = "";
    this.jobyerDebutTitreTravail = "";
    this.jobyerFinTitreTravail = "";
    this.email = "";
    this.tel = "";

    this.isDraft = "OUI";

    this.prerequis = [];
  }
}
