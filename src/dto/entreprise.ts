import {AbstractGCallout} from "./generium/abstract-gcallout";
import {Address} from "./address";

export class Entreprise extends AbstractGCallout {

  id: number;
  nom: string;
  siret: string;
  naf: string;
  urssaf: string;
  siegeAdress: Address;
  workAdress: Address;
  correspondanceAdress: Address;
  conventionCollective: number;
  // private List<OfferData> offers = new ArrayList<OfferData>();

  constructor() {
    super('com.vitonjob.callouts.auth.model.Entreprise');

    this.id = 0;
    this.nom = "";
    this.siret = "";
    this.naf = "";
    this.urssaf = "";
    this.siegeAdress = new Address();
    this.workAdress = new Address();
    this.correspondanceAdress = new Address();
  }
}
