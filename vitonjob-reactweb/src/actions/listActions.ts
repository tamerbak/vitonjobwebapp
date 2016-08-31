import AppDispatcher from '../dispatcher/appDispatcher';
import ListConstants from '../constants/listConstants';
import ListServices from '../services/listServices';

export default {

  // Action : get the country calling codes List
  getCountryCallingCodes: () => {
    ListServices
    .getCountryCallingCodes()
      .then((res:any) => {
        AppDispatcher.dispatch({
          actionType: ListConstants.COUNTRY_CODES_CASE,
          response: res
        });
      })
      .catch((err:any) => {
        AppDispatcher.dispatch({
          actionType: ListConstants.ERROR_GETTING_LIST_CASE,
          error: err,
          listName:"CountryCallingCodesList",
        });
      });
  }

}
