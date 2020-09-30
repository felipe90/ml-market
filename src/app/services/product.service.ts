import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private siteId = '';
  private _availableFilters = [];
  private _availableSorts = [];
  private appliedSort = {}
  private appliedFilters = {}

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

  constructor(private requestService: RequestService) {
    this.requestService.getItems().pipe(take(1)).subscribe((res: any) => {
      this._availableFilters = res.available_filters
      this._availableSorts = res.available_sorts
      this.appliedSort = res.sort
    })
  }

}
