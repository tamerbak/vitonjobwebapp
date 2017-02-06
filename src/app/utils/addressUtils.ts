import {Injectable} from "@angular/core";
import {Utils} from "../utils/utils";
import {Address} from "../../dto/address";

@Injectable()
export class AddressUtils {

  constructor() {
  }

  public static decorticateGeolocAddressObj(address: Address, geolocAddress): void {
    let result = this.decorticateGeolocAddress(geolocAddress);

    address.id = 0;
    address.streetNumber = result.streetNumber;
    address.name = result.name;
    address.fullAdress = "";
    address.street = result.street;
    address.cp = result.zipCode;
    address.ville = result.city;
    address.pays = result.country;
  }

  public static decorticateGeolocAddress(geolocAddress) {
    var adrObj = {name, streetNumber: '', street: '', zipCode: '', city: '', country: ''};


    for (var i = 0; i < geolocAddress.address_components.length; i++) {
      if (geolocAddress.address_components[i].types[0] == "street_number") {
        adrObj.streetNumber = geolocAddress.address_components[i].long_name;
        continue;
      }
      if (geolocAddress.address_components[i].types[0] == "route") {
        adrObj.street = geolocAddress.address_components[i].long_name;
        continue;
      }
      if (geolocAddress.address_components[i].types[0] == "postal_code") {
        adrObj.zipCode = geolocAddress.address_components[i].long_name;
        continue;
      }
      if (geolocAddress.address_components[i].types[0] == "locality") {
        adrObj.city = geolocAddress.address_components[i].long_name;
        continue;
      }
      if (geolocAddress.address_components[i].types[0] == "country") {
        adrObj.country = geolocAddress.address_components[i].long_name;
        continue;
      }
    }

    if (!Utils.isEmpty(geolocAddress.name) && !Utils.isEmpty(adrObj.street) && geolocAddress.name.indexOf(adrObj.street) != -1) {
      adrObj.name = "";
    } else {
      adrObj.name = geolocAddress.name;
    }
    console.log()
    return adrObj;
  }


}
