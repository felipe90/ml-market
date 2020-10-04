import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  public selectedValue;
  public suggestions = [];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {

  }

  public searchSuggestions(event): void {
    const query = event.query;
    this.productService.getSuggestionsByQuery(query).subscribe((res) => {
      if (!res) {
        return;
      }
      this.suggestions = res
    })
  }

  public selectSuggestion(event) {
    this.selectedValue = event;
    this._performSearch(this.selectedValue)
  }

  public searchProducts(event) {
    if (!this.selectedValue) {
      return;
    }
    // User should press "Enter" after search or click on search icon
    if ((event.type === "keyup" && event.keyCode === 13) || event.type === "click") {
      this._performSearch(this.selectedValue)
    }
  }

  private _performSearch(query: string) {
    this.productService.getItemsByTitle(query).subscribe((res) => {
      if (!res) {
        return;
      }
      console.log(res)
    });
  }

}
