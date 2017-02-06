/**
 * Created by kelvin on 02/02/2017.
 */

import {Component, Input, Output, EventEmitter, SimpleChanges} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AddressUtils} from "../../utils/addressUtils";
import {MapsAPILoader} from "angular2-google-maps/core";
import {Address} from "../../../dto/address";
import {Utils} from "../../utils/utils";

declare let jQuery: any;
declare let google: any;

@Component({
  selector: '[autocomplete-address]',
  template: require('./autocomplete-address.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [],
  styles: [ require('./autocomplete-address.scss')]
})

export class AutocompleteAddress {

  @Input()
  address: Address;

  @Input()
  inputLabel: string;

  @Input()
  placeholder: string;

  @Output()
  onChange = new EventEmitter<any>();

  @Output()
  validation = new EventEmitter<any>();

  autocomplete: any;

  addressOptions = {
    componentRestrictions: {country: "fr"}
  };

  offerAddress: string;

  constructor(private mapsAPILoader: MapsAPILoader) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // let self = this;
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocompleteAddress"), this.addressOptions
      );
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['address'] && changes['address'].previousValue != changes['address'].currentValue) {
      if (Utils.isEmpty(changes['address'].currentValue) == false) {
        this.offerAddress = this.constructAdress(changes['address'].currentValue);
      }
    }
  }

  autocompleteAddress() {
    let self = this;
    this.mapsAPILoader.load().then(() => {

      google.maps.event.addListener(this.autocomplete, 'place_changed', () => {

        let place = this.autocomplete.getPlace();
        let result: number = AddressUtils.decorticateGeolocAddressObj(self.address, place);
        if (result == -1) {
          // Incorrect val
          jQuery('#autocompleteAddress').addClass('warning-empty');
          self.validation.emit({
            isValidAddress: false
          });
        } else {
          jQuery('#autocompleteAddress').removeClass('warning-empty');
          self.validation.emit({
            isValidAddress: true
          });
        }

        // this.zone.run(() => {
          //
          // this.nameOA = !addressObj.name ? '' : addressObj.name.replace("&#39;", "'");
          // this.streetNumberOA = addressObj.streetNumber.replace("&#39;", "'");
          // this.streetOA = addressObj.street.replace("&#39;", "'");
          // this.zipCodeOA = addressObj.zipCode;
          // this.cityOA = addressObj.city.replace("&#39;", "'");
          // this.countryOA = (addressObj.country.replace("&#39;", "'") == "" ? 'France' : addressObj.country.replace("&#39;", "'"));
          // this.offerAddress = this.constructAdress();
        // });
      });
    });
  }

  constructAdress(address: Address) {

    let adr = "";
    if (address.name && address.name.length > 0) {
      adr = adr + address.name + ", ";
    }

    if (address.streetNumber && address.streetNumber.length > 0) {
      adr = adr + address.streetNumber + " ";
    }

    if (address.street && address.street.length > 0) {
      adr = adr + address.street + ", ";
    }

    if (address.cp && address.cp.length > 0) {
      adr = adr + address.cp + " ";
    }

    if (address.ville && address.ville.length > 0) {
      adr = adr + address.ville + ", ";
    }

    if (address.pays && address.pays.length > 0) {
      adr = adr + address.pays;
    } else {
      adr = adr + 'France';
    }

    console.log('Convert address from:');
    console.log(address);
    console.log('To:');
    console.log(adr.trim());

    return adr.trim();
  }
}
