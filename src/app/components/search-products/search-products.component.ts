import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  public selectedValue;
  public suggestions = [];

  private _subscriptions: Map<string, Subscription> = new Map();
  private _wasSearchedByUrl = false;

  constructor(
    private location: Location,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._subscriptions.set('route-sub', this.route.queryParams.subscribe((params) => {
      if (!params) return;

      if (params.search) {
        this._wasSearchedByUrl = true;
        this._performSearch(params.search, true);
        this.setSuggestion(params.search)
      }
    }));
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe())
  }

  public searchSuggestions(event): void {
    const query = event.query;
    this.productService.getSuggestionsByQuery(query).subscribe((res) => {
      if (!res) return;

      this.suggestions = res.map(suggestion => suggestion.q)
    })
  }

  public setSuggestion(event) {
    this.selectedValue = event;
    this._performSearch(this.selectedValue)
  }

  public searchProducts(event) {
    if (!this.selectedValue) return;

    // User should press "Enter" after search or click on search icon
    if ((event.type === "keyup" && event.keyCode === 13) || event.type === "click") {
      this._performSearch(this.selectedValue)
    }
  }

  private _performSearch(query: string, wasSearchedByUrl = false) {
    if (this.productService.checkCacheSearch(query)) return;

    this.productService.getProductListByTitle(query).subscribe((res) => {
      if (!res) return;

      if (!wasSearchedByUrl) {
        this.location.go(`/items?search=${query}`);
      }
      this.productService.products = res;
    });
  }

}
