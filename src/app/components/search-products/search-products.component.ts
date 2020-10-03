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
      const options = res.map((suggestion) => {
        // return <any>{
        //   name: suggestion.q,
        //   label: suggestion.q,
        //   value: suggestion.q,
        //   code: suggestion.q
        // }
        return suggestion.q
      })
      this.suggestions = [...options]
      console.log(this.suggestions)
    })
  }

  public onSelectSuggestion(event) {
    console.log(event)
  }

}
