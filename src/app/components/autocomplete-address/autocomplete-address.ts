/**
 * Created by kelvin on 02/02/2017.
 */

import {Component, Input, Output, EventEmitter, SimpleChanges} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AddressUtils} from "../../utils/addressUtils";
import {MapsAPILoader} from "angular2-google-maps/core";
import {Address} from "../../../dto/address";
import {Utils} from "../../utils/utils";
import {AddressService} from "../../../providers/address.service";

declare let jQuery: any;
declare let google: any;

@Component({
  selector: '[autocomplete-address]',
  template: require('./autocomplete-address.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [AddressService],
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

  constructor(private mapsAPILoader: MapsAPILoader,
              private addressService: AddressService) {
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
        this.offerAddress = this.addressService.constructAdress(changes['address'].currentValue);
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


}
