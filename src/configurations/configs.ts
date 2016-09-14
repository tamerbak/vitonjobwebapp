import {Headers} from "@angular/http";

export class Configs {
    public static calloutURL:string = 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/business';
    public static sqlURL:string = 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/sql';
    public static yousignURL:string = 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/business';
    public static smsURL:string = 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/envoisms';
    public static emailURL:string = 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/envoimail';
    public static fssURL:string = 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/fssjs';

    public static getHttpJsonHeaders(){
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');
        return headers;
    }
    public static getHttpTextHeaders(){
        let headers = new Headers();
        headers.append("Content-Type", 'text/plain');
        return headers;
    }
    public static getHttpXmlHeaders(){
        let headers = new Headers();
        headers.append("Content-Type", 'text/xml');
        return headers;
    }
}
