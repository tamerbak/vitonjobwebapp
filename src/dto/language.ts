import {AbstractGCallout} from "./generium/abstract-gcallout";

export class Language extends AbstractGCallout {

  idLanguage: number;
  idLevel: number;

  constructor() {
    super('com.vitonjob.callouts.offer.model.LanguageData');

    this.idLanguage = 0;
    this.idLevel = 0;
  }

}
