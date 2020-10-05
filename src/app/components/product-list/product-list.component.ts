import Product from 'src/app/models/product.model';
import ProductsList from 'src/app/models/productsList.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public products: Product[] = [];

  private _subscriptions: Map<string, Subscription> = new Map();


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this._subscriptions.set('products-sub', this.productService.productsChange
      .subscribe((productsList: ProductsList) => {
        this.products = productsList.items;
        console.log(this.products)
      }))
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe())
  }
}
