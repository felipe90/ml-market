import { Injectable } from '@angular/core';
import { ItemsRequestService } from './ItemsRequest.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products = [];
  private _selectedProduct;

  public get products(): any[] {
    return [...this._products]
  }

  public set products(value: any[]) {
    this._products = [...value];
  }

  public get selectedProduct(): any {
    return this._selectedProduct
  }

  public set selectedProduct(value: any) {
    this._selectedProduct = value;
  }

  constructor(private requestService: ItemsRequestService) {}

  public getItemsByTitle(title: string): Observable<any> {
    const params = { "title": title };

    return this.requestService.getItems(params).pipe(take(1));
  }

  public getSuggestionsByQuery(query: string): Observable<any> {
    return this.requestService.getSuggestedQueries(query)
      .pipe(take(1))
      .pipe(map(res => res.suggested_queries));
    ;
  }

}
