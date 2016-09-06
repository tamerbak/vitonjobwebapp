import {Component, ViewEncapsulation} from '@angular/core';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';
import {ProfileService} from "../../providers/profile-service";
import {CommunesService} from "../../providers/communes-service";
import {LoadListService} from "../../providers/loadList-service";
import {MedecineService} from "../../providers/medecine-service";
import {Utils} from "../../utils/utils";
declare var jQuery,require: any;

@Component({
  selector: '[profile]',
  template: require('./profile.html'),
  directives: [NKDatetime],
  providers: [Utils,ProfileService,CommunesService,LoadListService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')]
})
export class Profile {

  title:string;
  lastname:string="Daoudi";
  firstname:string;
  companyname:string;
  siret:string;
  ape:string;
  birthdate;
  birthplace:string;
  medecineTravail:string;
  cni:string;
  numSS:string;
  nationality:any="9";
  nationalities=[];
  isValidLastname:boolean = false;
  lastnameHint:string = "";
  
  constructor(private listService:LoadListService){

    listService.loadNationalities().then((response:any) => {
        console.log(response);
        console.log(this.nationality);
        jQuery('.selectpicker').selectpicker();
        this.nationalities = response.data;
        this.nationality = "9";
    });
  }

  ngAfterViewInit(): void {

    jQuery('.commune-select').select2(
      {
    ajax: {
      url: 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/sql',
      type: 'POST',
      dataType: 'json',
      quietMillis: 250,
      params: {
        contentType: "text/plain",
      },
      data: function (term, page) {
          return "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) % lower_unaccent('"+term+"') limit 5" // search term

      },
      results: function (data, page) {

          console.log(data)


          return { results: data.data };
      },
      cache: true
  },


  formatResult: function(item) {

      return item.nom;
   },
   formatSelection: function(item) {
      return item.nom;
   },
dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 3,
      }
    );

    jQuery('.medecine-select').select2(
      {
        ajax: {
      url: 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/sql',
      type: 'POST',
      dataType: 'json',
      quietMillis: 250,
      params: {
        contentType: "text/plain",
      },
      data: function (term, page) {
          return "select pk_user_medecine_de_travail as id, libelle from user_medecine_de_travail where lower_unaccent(libelle) % lower_unaccent('"+term+"') limit 5"; // search term
      },
      results: function (data, page) {

          console.log(data)


          return { results: data.data };
      },
      cache: true
  },


  formatResult: function(item) {
      return  item.libelle;
   },
   formatSelection: function(item) {
      return item.libelle;
   },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 3,
      }
   );
        jQuery('.commune-select').on(
                'change',
                (e) =>
                {
                  console.log(e);

                }
            );
  }






  watchLastname(e) {
      let name = e.target.value;
      let _isValid:boolean = true;
      let _hint:string = "";

      if(!Utils.isValidName(name) ){
        _hint = "Saisissez un nom valide";
        _isValid = false;
      }else{
        _hint = "";
      }

      this.isValidLastname = _isValid;
      this.lastnameHint = _hint;
      console.log();
  }

}
