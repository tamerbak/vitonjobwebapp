import {Injectable} from "@angular/core";

/**
 * @author Amal ROCHD
 * @description service shared between different components of the app
 */

@Injectable()
export class SharedService {
  stockageType: string;

  constructor() {
    this.stockageType = localStorage.getItem('stockageType');

  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
  }

  getStorageType() {
    return localStorage.getItem('stockageType');
  }

  setStorageType(value) {
    localStorage.setItem('stockageType', value);
  }

  protected getStorageVariable(variableName) {
    if (this.stockageType == "local")
      return JSON.parse(localStorage.getItem(variableName));
    else
      return JSON.parse(sessionStorage.getItem(variableName));
  }

  protected setStorageVariable(variableName, value) {
    if (this.stockageType == "local")
      return localStorage.setItem(variableName, JSON.stringify(value));
    else
      return sessionStorage.setItem(variableName, JSON.stringify(value));
  }

  protected getStorageVariableRaw(variableName) {
    if (this.stockageType == "local")
      return localStorage.getItem(variableName);
    else
      return sessionStorage.getItem(variableName);
  }

  protected setStorageVariableRaw(variableName, value) {
    if (this.stockageType == "local")
      return localStorage.setItem(variableName, value);
    else
      return sessionStorage.setItem(variableName, value);
  }

  getProjectTarget() {
    return this.getStorageVariableRaw("projectTarget");
  }

  setProjectTarget(value) {
    this.setStorageVariableRaw("projectTarget", value);
  }

  getPartner() {
    return this.getStorageVariableRaw("partner");
  }

  setPartner(value) {
    this.setStorageVariableRaw("partner", value);
  }

  getCurrentUser() {
    return this.getStorageVariable("currentUser");
  }

  setCurrentUser(value) {
    this.setStorageVariable("currentUser", value);
  }

  getCurrentOffer() {
    return this.getStorageVariable("currentOffer");
  }

  setCurrentOffer(value) {
    this.setStorageVariable("currentOffer", value);
  }

  getCurrentMission() {
    return this.getStorageVariable("currentMission");
  }

  setCurrentMission(value) {
    this.setStorageVariable("currentMission", value);
  }

  getCurrentJobyer() {
    return this.getStorageVariable('currentJobyer');
  }

  setCurrentJobyer(value) {
    this.setStorageVariable('currentJobyer', value);
  }

  getContractData() {
    return this.getStorageVariable('ContractData');
  }

  setContractData(value) {
    this.setStorageVariable('ContractData', value);
  }

  getCurrentInvoice() {
    return this.getStorageVariable("currentInvoice");
  }

  setCurrentInvoice(value) {
    this.setStorageVariable("currentInvoice", value);
  }

  getLastResult() {
    return this.getStorageVariable("lastResult");
  }

  setLastResult(value) {
    this.setStorageVariable("lastResult", value);
  }

  getLastIndexation(){
    return this.getStorageVariable("LAST_INDEX");
  }

  setLastIndexation(value){
    this.setStorageVariable("LAST_INDEX", value);
  }

  getSectorList() {
    return this.getStorageVariable("sectorList");
  }

  setSectorList(value) {
    this.setStorageVariable("sectorList", value);
  }

  getJobList() {
    return this.getStorageVariable("jobList");
  }

  setJobList(value) {
    this.setStorageVariable("jobList", value);
  }

  getQualityList() {
    return this.getStorageVariable("qualityList");
  }

  setQualityList(value) {
    this.setStorageVariable("qualityList", value);
  }

  getOwnQualityList() {
    return this.getStorageVariable("ownQualityList");
  }

  setOwnQualityList(value) {
    this.setStorageVariable("ownQualityList", value);
  }

  getLangList() {
    return this.getStorageVariable("langList");
  }

  setLangList(value) {
    this.setStorageVariable("langList", value);
  }

  getSearchResult() {
    return this.getStorageVariable("searchResult");
  }

  setSearchResult(value) {
    this.setStorageVariable("searchResult", value);
  }

  getOptionMIssion() {
    return this.getStorageVariable("optionMission");
  }

  setOptionMission(value) {
    this.setStorageVariable("optionMission", value);
  }

  getProfilImageUrl() {
    if (this.stockageType == "local") {
      var image = localStorage.getItem('profilImage');
      if (image !== 'null') {
        return localStorage.getItem('profilImage');
      }
    } else {
      var image = sessionStorage.getItem('profilImage');
      if (image !== 'null') {
        return sessionStorage.getItem('profilImage');
      }
    }
    if (!!this.getCurrentUser().estEmployeur) {
      return 'assets/images/people/employer.jpg';
    } else {
      return 'assets/images/people/jobyer.jpg';
    }
  }

  setProfilImageUrl(value) {
    this.setStorageVariableRaw("profilImage", value);
  }

  getRecruiterList() {
    return this.getStorageVariable("recruiterList");
  }

  setRecruiterList(value) {
    this.setStorageVariable("recruiterList", value);
  }

  getCurrentRecruiter() {
    return this.getStorageVariable("currentRecruiter");
  }

  setCurrentRecruiter(value) {
    this.setStorageVariable("currentRecruiter", value);
  }

  getFromPage() {
    return this.getStorageVariableRaw("fromPage");
  }

  setFromPage(value) {
    this.setStorageVariableRaw("fromPage", value);
  }

  getMapView() {
    return this.getStorageVariable("mapView");
  }

  setMapView(value) {
    this.setStorageVariable("mapView", value);
  }

  getPreviousNotifs() {
    return this.getStorageVariable("lastNotif");
  }

  setPreviousNotifs(value) {
    this.setStorageVariable("lastNotif", value);
  }

  getAdvertMode() {
    return this.getStorageVariable("lastNotif");
  }

  setAdvertMode(value){
    this.setStorageVariable("ADVERT",value);
  }

  setCurrentAdv(value) {
    this.setStorageVariable("currentAdv", value);
  }

  getCurrentAdv() {
    return this.getStorageVariable("currentAdv");
  }

  getCurrentQuote() {
    return this.getStorageVariable("currentQuote");
  }

  setCurrentQuote(value) {
    this.setStorageVariable("currentQuote", value);
  }

  getSelectedJobyer() {
    return this.getStorageVariable("selectedJobyer");
  }

  setSelectedJobyer(value) {
    this.setStorageVariable("selectedJobyer", value);
  }

  getConventionFilters() {
    return this.getStorageVariable("conventionFilters");
  }

  setConventionFilters(value) {
    this.setStorageVariable("conventionFilters", value);
  }

  getCurrentSearch() {
    return this.getStorageVariable("currentSearch");
  }

  setCurrentSearch(value) {
    this.setStorageVariable("currentSearch", value);
  }

  getCurrentSearchCity() {
    return this.getStorageVariable("currentSearchCity");
  }

  setCurrentSearchCity(value) {
    this.setStorageVariable("currentSearchCity", value);
  }

  getRedirectionArgs() {
    return this.getStorageVariable("redirectionArgs");
  }

  setRedirectionArgs(value) {
    this.setStorageVariable("redirectionArgs", value);
  }

  isFromPartner(){
    return this.getStorageVariable("isFromPartner");
  }

  setFromPartner(value: boolean){
    this.setStorageVariable("isFromPartner", value);
  }
}
