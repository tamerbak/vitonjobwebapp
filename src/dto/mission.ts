export class Mission{
  pk_user_contrat: number;
  numero: string;
  titre: string;
  nom: string;
  prenom: string;

  fk_user_jobyer: number;
  fk_user_entreprise: number;

  option_mission: number;

  signature_employeur: string;
  signature_jobyer: string;
  annule_par: string;

  vu: string;
  approuve: string;
  accompli: string;

  releve_employeur: string;
  releve_jobyer: string;

  numero_de_facture: string;

  constructor(){
    this.pk_user_contrat = 0;
    this.numero = "0";
    this.titre = "";
    this.nom = "";
    this.prenom = "";

    this.fk_user_jobyer = 0;
    this.fk_user_entreprise = 0;

    this.option_mission = 1;

    this.signature_employeur = 'NON';
    this.signature_jobyer = 'NON';
    this.annule_par = "";

    this.vu = 'NON';
    this.approuve = "NON";
    this.accompli = "NON";

    this.releve_employeur = 'NON';
    this.releve_jobyer = "NON";

    this.numero_de_facture = "";
  }
}
