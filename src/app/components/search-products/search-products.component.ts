import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  public searchValue;


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // this.productService.getItems().subscribe((res: any) => {
    //   console.log(res)
    // })

  }

}
