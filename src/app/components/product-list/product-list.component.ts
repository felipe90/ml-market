import Product from 'src/app/models/product.model';
import ProductsList from 'src/app/models/productsList.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  public productsList: ProductsList = null;
  public relatedCategories: MenuItem[] = [];

  private _subscriptions: Map<string, Subscription> = new Map();

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this._subscriptions.set('products-sub', this.productService.productsChange
      .subscribe((productsList: ProductsList) => {
        this.productsList = productsList;
        this.products = productsList.items;
        this.relatedCategories = this.getRelatedCategories(productsList.items[0]);
      }))
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe())
  }

  public getRelatedCategories(item: Product): any {
    if (!item) return;

    return item.categories.map((cat) => {
      const parsedUrl = cat.normalize('NFD').replace(/[\u0300-\u036f]/g,"")
      return <MenuItem>{
        label: cat,
        url: `/items?search=${parsedUrl}`
      }
    });
  }
}
