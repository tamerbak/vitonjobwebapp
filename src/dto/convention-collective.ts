import {AbstractGCallout} from "./generium/abstract-gcallout";
/**
 * Created by kelvin on 07/02/2017.
 */

export class ConventionCollective extends AbstractGCallout {

  code: string;
  id: number;
  libelle: string;

  constructor() {
    super('com.vitonjob.callouts.auth.model.ConventionCollective');
  }
}
