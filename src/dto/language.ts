import {AbstractGCallout} from "./generium/abstract-gcallout";

export class Language extends AbstractGCallout {

  id: number;
  level: number;

  constructor() {
    super('com.vitonjob.callouts.offer.model.LanguageData');

    this.id = 0;
    this.level = 1;
  }

}
