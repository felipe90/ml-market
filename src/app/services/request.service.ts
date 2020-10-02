import config from '../../assets/config/config.json';
import Product from '../models/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, toArray, values } from 'lodash';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public getItems(params?: any): Observable<any> {
    const url = this.getQueryUrl(config)
    const query = params ? this.getParams(params): '';

    console.log(`${url}${query}`)

    return params ? this.http.get(`${url}=${query}`) : this.http.get(url);
  }

  private getQueryUrl(config: any): string {
    let requestURL = `http://${config.host}:${config.port}${config.api}${config.productsUrl}`;

    return requestURL
  }

  private getParams(params: any): string {
    const options = [];
    Object.keys(params).forEach(keyName => {
      options.push(`${keyName}=${params[keyName]}`)
    });

    return options.join('&');
  }
}
