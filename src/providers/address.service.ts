/**
 * Created by kelvin on 07/02/2017.
 */

import {Injectable} from "@angular/core";
import {Address} from "../dto/address";
import {ProfileService} from "./profile.service";

@Injectable()
export class AddressService {

  constructor(private profileService: ProfileService) {

  }

  /**
   * Save address from an object
   *
   * @param ownerId
   * @param address
   * @param ownerRole
   */
  updateMainAddress(ownerId: number, address: Address, ownerRole: string): any {
    return this.profileService.updateUserPersonalAddress(
      ownerId.toString(),
      address.name,
      address.streetNumber,
      address.street,
      address.cp,
      address.ville,
      address.pays,
      ownerRole
    );
  }

  /**
   * Save address from an object
   *
   * @param ownerId
   * @param address
   * @param ownerRole
   */
  updateCorrespondenceAddress(ownerId: number, address: Address, ownerRole: string): any {
    return this.profileService.updateUserCorrespondenceAddress(
      ownerId.toString(),
      address.name,
      address.streetNumber,
      address.street,
      address.cp,
      address.ville,
      address.pays,
      ownerRole
    );
  }

  /**
   * Save address from an object
   *
   * @param ownerId
   * @param address
   * @param ownerRole
   */
  updateJobAddress(ownerId: number, address: Address, ownerRole: string): any {
    return this.profileService.updateUserJobAddress(
      ownerId.toString(),
      address.name,
      address.streetNumber,
      address.street,
      address.cp,
      address.ville,
      address.pays,
      ownerRole
    );
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
