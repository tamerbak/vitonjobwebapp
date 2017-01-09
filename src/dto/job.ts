/**
 * Created by kelvin on 09/01/2017.
 */

export class Job {
  'class': string;
  job: string;
  sector: string;
  idSector: number;
  idJob: number;
  level: string;
  remuneration: number;
  currency: string;
  validated: boolean;
  prerequisObligatoires: any[];
  epi: any[];

  constructor() {
    this.class = 'com.vitonjob.callouts.auth.model.JobData';

    this.job = "";
    this.sector = "";
    this.idSector = 0;
    this.idJob = 0;
    this.level = 'junior';
    this.remuneration = null;
    this.currency = 'euro';
    this.validated = false;
    this.prerequisObligatoires = [];
    this.epi = [];
  }
}
