import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { CustomerModel } from './customer-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceNowService {

  constructor(private http: HttpClient) { }

  private url = 'https://raleighncdev.service-now.com/api/now/table/u_stg_public_records_request';
  private user = 'prriu';
  private password = 'Wn9szf4BYd??5dL&';

  // private auth = btoa(unescape(encodeURIComponent(`${this.user} : ${this.password}`)));  not sure why this doesn't work.
  private auth = btoa(unescape(encodeURIComponent(this.user + ':' + this.password)));


  createSNRequest(formdata: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${this.auth}`
      })
    };

    // const formdataStr = JSON.stringify(formdata);
    return this.http.post(this.url, formdata, httpOptions);
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
}
