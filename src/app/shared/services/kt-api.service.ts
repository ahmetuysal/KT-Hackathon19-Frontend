import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KtApiService {
  private base_url: String;
  private redirect_url: String;

  constructor(private http: HttpClient) {
    this.base_url = environment.kt_api_base_url;
    this.redirect_url = environment.kt_redirect_url;
  }

  // https://idprep.kuveytturk.com.tr/api/connect/authorize?client_id=767cd0038db442528b076f01bd1aa1b3&scope=accounts&response_type=code&redirect_uri=&state=abc

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    headersConfig['Authorization'] = `Bearer ${1}`;

    return new HttpHeaders(headersConfig);
  }

  get(path: string, parameters: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${this.base_url}${path}`, { headers: this.setHeaders(), params: parameters })
      .pipe(catchError((error: any) => of(error.error)));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${this.base_url}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
      .pipe(catchError((error: any) => of(error.error)));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${this.base_url}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
      .pipe(catchError((error: any) => of(error.error)));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${this.base_url}${path}`, { headers: this.setHeaders() })
      .pipe(catchError((error: any) => of(error.error)));
  }
}
