import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { take } from 'rxjs/operators';


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

  constructor(private requestService: RequestService) {
    const params = {
      "title": "Apple ipod",
      "accepts_mercadopago": 'yes'
    }

    let id = null;
    this.requestService.getItems(params).pipe(take(1)).subscribe((res: any) => {
      console.log(res[0].item.id)
      id = res[0].item.id
      this.requestService.getItem(id).pipe(take(1)).subscribe((res: any) => {
        console.log(res)
      })
    })
  }

}
