export class RubriquePersonnalisee {
  id : number;
  code : string;
  designation : string;
  coefficient : number;
  periodicite : string;
  soumisCotisations : boolean;

  constructor() {
    this.id = 0;
    this.code = "";
    this.designation = "";
    this.coefficient = 0;
    this.periodicite = "H";
    this.soumisCotisations = false;
  }
}
