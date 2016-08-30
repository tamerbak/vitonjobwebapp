import AppDispatcher from '../dispatcher/appDispatcher';
import ListConstants from '../constants/listConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
var _countryCodes:Array<{value:string,label:string}> = [];

function fillCountryCallingCodeList(response:any){
  _countryCodes = [];
  var data:Array<{indicatif_telephonique:string,nom:string}> = response.data;

  for (var obj of data)
     {
        _countryCodes.push({
          value: obj.indicatif_telephonique,
          label: obj.nom
        });
     }
}


class ListStoreClass extends EventEmitter {
  dispatchToken:string;

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback:any) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback:any) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getCountryCallingsCodes() {
    return _countryCodes;
  }

}

const ListStore = new ListStoreClass();

// register a callback for the dispatcher and respond appropriately to various action types
ListStore.dispatchToken = AppDispatcher.register((action:any) => {

  switch(action.actionType) {

    case ListConstants.COUNTRY_CODES_CASE:
      fillCountryCallingCodeList(action.response);
      ListStore.emitChange();
      break;

    case ListConstants.ERROR_GETTING_LIST_CASE:
      console.log("error in getting list: "+action.listName );
      console.log(action.error);
      ListStore.emitChange();
      break;

    default:
  }


});

export default ListStore;
