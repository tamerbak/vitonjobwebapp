import {AbstractGCallout} from "./generium/abstract-gcallout";
import {Address} from "./address";
import {Offer} from "./offer";
import {ConventionCollective} from "./convention-collective";

export class Entreprise extends AbstractGCallout {

  id: number;
  nom: string;
  siret: string;
  naf: string;
  urssaf: string;
  siegeAdress: Address;
  workAdress: Address;
  correspondanceAdress: Address;
  conventionCollective: ConventionCollective;
  offers: Offer[];

  constructor() {
    super('com.vitonjob.callouts.auth.model.Entreprise');

    this.id = 0;
    this.nom = "";
    this.siret = "";
    this.naf = "";
    this.urssaf = "";

    // Addresses
    this.siegeAdress = new Address();
    this.workAdress = new Address();
    this.correspondanceAdress = new Address();

    this.conventionCollective = new ConventionCollective();
    this.offers = [];
  }
}
