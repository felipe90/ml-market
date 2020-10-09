import Image from 'src/app/models/image.model';
import Product from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public product: Product;
  public isLoading: boolean;
  public images: Image[];
  public relatedCategories: MenuItem[] = [];
  public responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  private _subscriptions: Map<string, Subscription> = new Map();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._changeLoadingState(true);
    this._subscriptions.set('route-sub', this.route.paramMap.subscribe((map) => {
      if (!map['params']) return;

      console.log(map['params'].id)
      if (map['params'].id) {
      this._performSearch(map['params'].id, true);
        //   this.setSuggestion(params.search)
      }
    }));

    this._subscriptions.set('products-sub', this.productService.onSelectedProductChange
      .subscribe((product: Product) => {
        this.product = product;
        this.relatedCategories = this.productService
          .getRelatedCategories(product.categories);
        console.log(this.relatedCategories)
        this.images = this.productService.fromPicturesRawArrayToImages(product.pictures, product)
        this._changeLoadingState(false);
      }))
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe())
  }

  private _performSearch(query: string, wasSearchedByUrl = false) {
    this.productService.getProductById(query).subscribe((res) => {
      if (!res) return;

      this.productService.selectedProduct = res;
    });
  }

  private _changeLoadingState(state: boolean) {
    this.isLoading = state;
  }

}
