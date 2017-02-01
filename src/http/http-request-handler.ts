import {Headers, Http} from "@angular/http";
import {Configs} from "../configurations/configs";
import {Injectable} from "@angular/core";

declare let Messenger: any;

/**
 * Created by tim on 25/01/2017.
 */

const timeOutPeriod: any = 120000;

@Injectable()
export class HttpRequestHandler {

  public http: any;
  static loaderComponent: any;
  static senderClassName: string;

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    let vojMessage: string = HttpRequestHandler.getErrMessage(error, HttpRequestHandler.senderClassName);

    HttpRequestHandler.presentToast(vojMessage);
    //TODO send email to notify us
    let errorObject: any = {success: false, error: error.message || error};
    return Promise.reject(errorObject);
  }

  /**
   * Constructor
   * @param http
   * @param toast
   * @param loading
   */
  constructor(http: Http
  ) {
    this.http = http;
  }

  /**
   * Send a callOut request via http post method
   * @param payload
   * @param classObject
   * @param silentMode
   * @returns {Observable<T>}
   */
  sendCallOut(payload: any, classObject?: any, silentMode?: boolean) {
    if (silentMode === false)
      HttpRequestHandler.presentLoading();
    HttpRequestHandler.senderClassName = (classObject) ? classObject.constructor.name : "";
    let headers: Headers = Configs.getHttpJsonHeaders();

    let post: any = this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers});
    let map: any = post.map(res=>res.json());
    // let timeout: any = map.timeout(timeOutPeriod);
    // let catchHandler: any = timeout.catch(this.handleError);
    // let final: any = map.finally(() => {
    //   if (HttpRequestHandler.loaderComponent)
    //     HttpRequestHandler.loaderComponent.dismiss();
    // });

    return map;
  }

  /**
   * Show a red toast that contains error message
   * @param message
   * @param duration
   * @param position
   */
  static presentToast(message: string, duration?: number, position?: string) {
    Messenger().post({
      message: message,
      type: 'error',
      showCloseButton: true
    });
  }

  /**
   * Present Loading component while the treatment of request
   */
  static presentLoading() {
    // TODO : Ajouter loader
    console.log('Loader requested');
  }

  /**
   * Get error message from status code
   * @param error
   * @param senderClassName
   * @returns {string}
   */
  static getErrMessage(error: any, senderClassName: string) {
    if (error.message === "timeout") {
      error.status = -100;
    }
    switch (~~(error.status / 100)) {
      case 0 :
        // General error with status 0: http://stackoverflow.com/a/26451773/2936049
        return "0 • Problème sur serveur, merci de réessayer ultérieurement. (" + senderClassName + ")";
      case 4 :
        // 4xx: client type error
        return "4 • Merci de vérifier votre connexion internet et réessayer ultérieurement. (" + senderClassName + ")";
      case 5 :
        // 5xx: server type error
        return "5 • Problème sur serveur, merci de réessayer ultérieurement. (" + senderClassName + ")";
      case -1 :
        // TimeOut error specified by us. See cont variable timeOutPeriod
        return "-1 • Merci de vérifier votre connexion internet et réessayer ultérieurement. (" + senderClassName + ")";
      default :
        // Other problems...
        return "• Merci de vérifier votre connexion internet et réessayer ultérieurement. (" + senderClassName + ")";
    }
  }
}
