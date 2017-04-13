import {AbstractGCallout} from "./../generium/abstract-gcallout";

export class ListElem extends AbstractGCallout {

  id: number;
  metadata: string; // JSON

  constructor() {
    super('com.vitonjob.callouts.offer.model.ListElem');
    this.id = 0;
    this.metadata = "";
  }
}
