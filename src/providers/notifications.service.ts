import {EventEmitter,Injectable, Inject} from "@angular/core";


@Injectable()
export class NotificationsService {
  autoSearchOffers: any = [];
  interestedJobyersOffers: any = [];

  offersUpdated;
  constructor() {
    this.offersUpdated = new EventEmitter();
  }

  public list() {
      return this.autoSearchOffers;
  }

  private addOffer(offer){
    var isOfferExist = false;
    for(var i = 0; i < this.autoSearchOffers.length; i++){
      if(this.autoSearchOffers[i].idOffer === offer.idOffer){
        this.autoSearchOffers[i] = offer;
        isOfferExist = true;
      }
    }
    if(!isOfferExist){
      this.autoSearchOffers.push(offer);
    }
  }

  private removeOffer(offer){
    var offerIndex = this.autoSearchOffers.filter((v)=> {
      return (v.idOffer == offer.idOffer);
    });
    if (this.autoSearchOffers.indexOf(offerIndex[0]) != -1) {
      this.autoSearchOffers.splice(this.autoSearchOffers.indexOf(offerIndex[0]), 1);
    }
  }

  public add(offer): void {
      this.addOffer(offer);
      this.offersUpdated.emit(offer);
  }

  public remove(offer): void {
      this.removeOffer(offer);
      this.offersUpdated.emit(offer);
  }

  public clear(): void {
      this.autoSearchOffers = [];
      this.offersUpdated.emit({});
  }
}
