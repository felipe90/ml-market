import config from '../../assets/config/config.json';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsRequestService {

  readonly API_URL = `${config.host}:${config.port}${config.api}`;

  constructor(private http: HttpClient) { }

  public getProductList(params?: any): Observable<any> {
    const query = params ? this.getParams(params) : '';
    const obs =
      params ?
        this.http.get(`http://${this.API_URL}${config.productsEndpoint}=${query}`) :
        this.http.get(`${this.API_URL}${config.productsEndpoint}`);

    return obs
      .pipe(catchError(this.handleError<any>([])))

  }

  public getProduct(itemId: string): Observable<any> {
    return this.http.get(`http://${this.API_URL}${config.productEndpoint}/${itemId}`)
      .pipe(catchError(this.handleError<any>([])));
  }

  private getParams(params: any): string {
    const options = [];
    Object.keys(params).forEach(keyName => {
      options.push(`${keyName}=${params[keyName]}`);
    });

    return options.join('&');
  }

  public getSuggestedQueries(title: string): Observable<any> {
    return this.http.get(`${config.suggestedQueriesEndPoint}${title}`);
  }

  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
