import {Component, ViewEncapsulation} from '@angular/core';
import {SharedService} from "../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {SearchService} from "../providers/search-service";
import {ProfileService} from "../providers/profile.service";

@Component({
  selector: '[search-results]',
  template: require('./search-results.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./search-results.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [SearchService, ProfileService]
})
export class SearchResults {
  searchResults: any;
  currentUser: any;
  projectTarget: string;

  constructor(private sharedService: SharedService,
              private router: Router,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.currentUser = this.sharedService.getCurrentUser();
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    //  Retrieving last search
    let jsonResults = this.sharedService.getLastResult();
    if (jsonResults) {
      this.searchResults = jsonResults;
      for (let i = 0; i < this.searchResults.length; i++) {
        let r = this.searchResults[i];
        r.matching = Number(r.matching).toFixed(2);
        r.index = i + 1;
        r.avatar = "../assets/images/avatar.png"
      }

      //load profile pictures
      for (let i = 0; i < this.searchResults.length; i++) {
        var role = this.projectTarget == 'employer' ? "employeur" : "jobyer";
        this.profileService.loadProfilePicture(null, this.searchResults[i].tel, role).then((data: any) => {
          if (data && data.data && data.data[0] && !this.isEmpty(data.data[0].encode)) {
            this.searchResults[i].avatar = data.data[0].encode;
          }
        });
      }
    }
  }

  contract(index) {
    //debugger;
    // TODO : check that user is connected
    // if (this.isUserAuthenticated) {

    // TODO currentEmployer
      let currentEmployer = this.sharedService.getCurrentUser();
      // let currentEmployer = this.employer.employer;

      // let userData = this.employer;
      // console.log(currentEmployer);
      //
      // //verification of employer informations
      // let redirectToCivility = (currentEmployer && currentEmployer.entreprises[0]) ?
      // (userData.titre == "") ||
      // (userData.prenom == "") ||
      // (userData.nom == "") ||
      // (currentEmployer.entreprises[0].nom == "") ||
      // (currentEmployer.entreprises[0].siret == "") ||
      // (currentEmployer.entreprises[0].naf == "") ||
      // (currentEmployer.entreprises[0].siegeAdress.id == 0) ||
      // (currentEmployer.entreprises[0].workAdress.id == 0) : true;
      //
      // let isDataValid = !redirectToCivility;
      //
      // if (isDataValid) {

        // TODO: Retrieve the offer
        // let o = this.navParams.get('currentOffer');
        let o = this.sharedService.getCurrentOffer();
        //navigate to contract page
        if (o != null) {
          // Notification page

          // Set parameters
          this.sharedService.setCurrentJobyer(this.searchResults[index]);
          // debugger;
          this.router.navigate(['app/contract/recruitment-form']);

          // this.nav.push(NotificationContractPage, {jobyer: this.searchResults[index], currentOffer: o});
        } else {
          // TODO: redirect employer to select or create an offer
          // let alert = Alert.create({
          //   title: 'Sélection de l\'offre',
          //   subTitle: "Veuillez sélectionner une offre existante, ou en créer une nouvelle pour pouvoir recruter ce jobyer",
          //   buttons: [
          //     {
          //       text: 'Liste des offres',
          //       handler: () => {
          //         this.selectOffer().then(offer => {
          //           if (offer) {
          //             this.nav.push(NotificationContractPage, {
          //               jobyer: this.searchResults[index],
          //               currentOffer: offer
          //             });
          //           } else {
          //             return;
          //           }
          //         });
          //       }
          //     },
          //     {
          //       text: 'Nouvelle offre',
          //       handler: () => {
          //         this.nav.push(OfferAddPage, {
          //           jobyer: this.searchResults[index],
          //           fromPage: "Search"
          //         });
          //       }
          //     },r
          //     {
          //       text: 'Annuler',
          //       role: 'cancel',
          //     }
          //   ]
          // });
          // this.nav.present(alert);
          //this.nav.push(ContractPage, {jobyer: this.searchResults[index]});
        }
      // } else {
        // TODO : redirect employer to fill the missing informations
        // let alert = Alert.create({
        //   title: 'Informations incomplètes',
        //   subTitle: "Veuillez compléter votre profil avant d'établir votre premier contrat",
        //   buttons: ['OK']
        // });
        // alert.onDismiss(()=> {
        //   this.nav.push(CivilityPage, {currentUser: this.employer});
        // });
        // this.nav.present(alert);

      // }
    // }
    // else {
    //   let alert = Alert.create({
    //     title: 'Attention',
    //     message: 'Pour contacter ce profil, vous devez être connecté.',
    //     buttons: [
    //       {
    //         text: 'Annuler',
    //         role: 'cancel',
    //       },
    //       {
    //         text: 'Connexion',
    //         handler: () => {
    //           this.nav.push(PhonePage, {fromPage: "Search"});
    //         }
    //       }
    //     ]
    //   });
    //   this.nav.present(alert);
    // }
  }

  /**
   * @description Selecting an item allows to call an action sheet for communications and contract
   * @param item the selected Employer/Jobyer
   */
  itemSelected(item) {
    let o = this.sharedService.getCurrentOffer();
    this.sharedService.setSearchResult(item);
    this.router.navigate(['app/search/details']);
    //this.router.navigate(['app/search/details', {item, o}]);
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
