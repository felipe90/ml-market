import Image from 'src/app/models/image.model';
import Product from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit
  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  get window(): Window { return this.document.defaultView; }

  public product: Product;
  public isLoading: boolean;
  public isSticky: boolean = false;
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

    @Inject(DOCUMENT) readonly document: Document
  ) {

    this._subscriptions.set('route-sub', this.route.paramMap.subscribe((map) => {
      if (!map['params']) return;

      if (map['params'].id) {
        this._performRequest(map['params'].id);
      }
    }));

    this._subscriptions.set('products-sub', this.productService.onSelectedProductChange
      .subscribe((product: Product) => {
        this.product = product;
        this.relatedCategories = this.productService
          .getRelatedCategories(product.categories);
        this.images = this.productService.fromPicturesRawArrayToImages(product.pictures, product)
        this._changeLoadingState(false);
      }))
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe())
  }

  public buyProduct(product: Product) {
    if (!product.permalink) return

    // Open product real link
    this.window.open(product.permalink, '_blank')
  }

  private _performRequest(query: string) {
    this._changeLoadingState(true);

    this.productService.getProductById(query).subscribe((res) => {
      if (!res) return;

      this.productService.selectedProduct = res;
      this._changeLoadingState(false);
    });
  }

  private _changeLoadingState(state: boolean) {
    this.isLoading = state;
  }

}
