import Product from 'src/app/models/product.model';
import ProductsList from 'src/app/models/productsList.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
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

  private subscriptions: Map<string, Subscription> = new Map();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {

    this.subscriptions.set('route-sub', this.route.queryParamMap.subscribe((map: ParamMap) => {
      if (!map.has('search')) return;

      this._initLocalProductsRef();
      this._performRequest(map.get('search'));
    }));

    this.subscriptions.set('search-sub', this.productService.onSearchQueryChange.subscribe((query: string) => {
      if (!query) return;

      this._performRequest(query);
    }));

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private _initLocalProductsRef(): void {
    this.productService.productsList = new ProductsList();
    this.products = [];
    this.relatedCategories = [];
  }

  private _performRequest(query: string): void {
    if (!query) return;
    this._changeLoadingState(true);

    this.productService.getProductListByTitle(query)
      .subscribe((productsList: ProductsList) => {
        this.productService.productsList = productsList;
        this.products = productsList.items;
        this.relatedCategories = this.productService
          .getRelatedCategories(productsList.items[0].categories);
        this._changeLoadingState(false);
      });
  }

  private _changeLoadingState(state: boolean): void {
    this.isLoading = state;
  }
}
