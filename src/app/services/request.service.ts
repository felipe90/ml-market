import config from '../../assets/config/config.json';
import Product from '../models/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}

  public getItems(params?: any): Observable<any> {
    const url = this.getQueryUrl(config, params)
    const options = this.getParams(params);

    return params ? this.http.get(url, options) :  this.http.get(url);
  }

  public getFilters(): Observable<any> {
    const url = this.getQueryUrl(config)

    return this.http.get(url);
  }

  private getQueryUrl(config: any, params?: any): string {
    let requestURL = `http://${config.host}:${config.port}${config.api}${config.productsUrl}`;

    return requestURL
  }

  private getParams(params): any {

    const a =  map(params,(value, key) => {
      return new HttpParams().set(key, value);
    })

    const options = {
        params: a
    }

    return options;
  }
}
