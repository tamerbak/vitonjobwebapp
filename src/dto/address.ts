
import {AbstractGCallout} from "./generium/abstract-gcallout";

export class Address extends AbstractGCallout {

  id: number;
  streetNumber: string;
  name: string;
  fullAdress: string;
  street: string;
  cp: string;
  ville: string;
  pays: string;
  type: string;

  constructor() {
    super('com.vitonjob.callouts.offer.model.AdressData');

    this.id = 0;
    this.streetNumber = "";
    this.name = "";
    this.fullAdress = "";
    this.street = "";
    this.cp = "";
    this.ville = "";
    this.pays = "France";
    this.type = "";
  }
}
