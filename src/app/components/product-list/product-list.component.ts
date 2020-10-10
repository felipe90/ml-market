import Product from 'src/app/models/product.model';
import ProductsList from 'src/app/models/productsList.model';
import { ActivatedRoute } from '@angular/router';
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
  public relatedCategories: MenuItem[] = [];
  public isLoading: boolean;

  private _subscriptions: Map<string, Subscription> = new Map();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {

    this._subscriptions.set('route-sub', this.route.queryParamMap.subscribe((map) => {
      if (!map) return;

      this._initLocalProductsRef();

      if (map['params']) {
        this._performRequest(map['params'].search);
      }
    }));

    this._subscriptions.set('search-sub', this.productService.onSearchQueryChange.subscribe((query: string) => {
      if (!query) return;

      this._performRequest(query);
    }));

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe())
  }

  private _initLocalProductsRef () {
    this.productService.productsList = new ProductsList();
    this.products = [];
    this.relatedCategories = [];
  }

  private _performRequest(query: string) {
    if (!query) return;
    this._changeLoadingState(true)

    this.productService.getProductListByTitle(query)
      .subscribe((productsList: ProductsList) => {
        this.productService.productsList = productsList;
        this.products = productsList.items;
        this.relatedCategories = this.productService
          .getRelatedCategories(productsList.items[0].categories);
        this._changeLoadingState(false);
      })
  }

  private _changeLoadingState(state: boolean) {
    this.isLoading = state;
  }
}
