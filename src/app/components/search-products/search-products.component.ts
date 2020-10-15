import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  readonly ITEMS_URL = '/items?search=';

  public selectedValue;
  public suggestions = [];

  private subscriptions: Map<string, Subscription> = new Map();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.set('route-sub', this.route.queryParamMap.subscribe((map: ParamMap) => {
      if (!map.has('search')) return;

      this.setSuggestion(map.get('search'));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public searchSuggestions(event): void {
    const query = event.query;
    this.productService.getSuggestionsByQuery(query).subscribe((res) => {
      if (!res) return;

      this.suggestions = res.map(suggestion => suggestion.q);
    });
  }

  public setSuggestion(event): void {
    if (!event) return;

    this.selectedValue = event;
    this._performSearch(this.selectedValue);
  }

  public searchProducts(event): void {
    if (!this.selectedValue) return;

    // User should press "Enter" after search or click on search icon
    if ((event.type === 'keyup' && event.keyCode === 13) || event.type === 'click') {
      this._performSearch(this.selectedValue);
    }
  }

  public goToHome(): void {
    this.selectedValue = '';
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  private _performSearch(query: string): void {
    if (!query || this.productService.checkCacheSearch(query)) return;
    const url = `${this.ITEMS_URL}${query}`;

    this.productService.searchQuery = query;
    this.router.navigateByUrl(url, { relativeTo: this.route });
  }

}
