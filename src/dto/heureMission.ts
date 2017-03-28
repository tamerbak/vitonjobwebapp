export class HeureMission{
  id: number;

  jour_debut: Date;
  jour_fin: Date;
  heure_debut: number;
  heure_fin: number;

  date_debut_pointe: string;
  date_fin_pointe: string;

  date_debut_pointe_modifie: string;
  date_fin_pointe_modifie: string;

  is_heure_debut_corrigee: string;
  is_heure_fin_corrigee: string;

  heure_debut_new: Date;
  heure_fin_new: Date;

  heure_debut_temp: string;
  heure_fin_temp: string;

  constructor(){
    this.id = 0;

    this.jour_debut = new Date();
    this.jour_fin = new Date();
    this.heure_debut = 0;
    this.heure_fin = 0;

    this.date_debut_pointe = "";
    this.date_fin_pointe = "";

    this.date_debut_pointe_modifie = "";
    this.date_fin_pointe_modifie = "";

    this.is_heure_debut_corrigee = "NON";
    this.is_heure_fin_corrigee = "NON";

    this.heure_debut_new = new Date();
    this.heure_fin_new = new Date();

    this.heure_debut_temp = "";
    this.heure_fin_temp = "";
  }
}
