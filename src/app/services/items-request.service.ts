import config from '../../assets/config/config.json';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsRequestService {

  readonly API_URL = `${config.host}:${config.port}${config.api}`;

  constructor(private http: HttpClient) { }

  public getProductList(params?: any): Observable<any> {
    const query = params ? this.getParams(params) : '';

    return params ?
      this.http.get(`http://${this.API_URL}${config.productsEndpoint}=${query}`) :
      this.http.get(`${this.API_URL}${config.productsEndpoint}`);
  }

  public getProduct(itemId: string): Observable<any> {
    return this.http.get(`http://${this.API_URL}${config.productEndpoint}/${itemId}`);
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
}
