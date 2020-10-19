import Image from 'src/app/models/image.model';
import Product from 'src/app/models/product.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  public product: Product;
  public isLoading: boolean;
  public isSticky = false;
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

  private subscriptions: Map<string, Subscription> = new Map();

  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    this.isSticky = window.pageYOffset >= 250;
  }

  get window(): Window { return this.document.defaultView; }

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,

    @Inject(DOCUMENT) readonly document: Document
  ) {

    this.subscriptions.set('route-sub', this.route.paramMap.subscribe((map: ParamMap) => {
      if (!map.has('id')) return;

      this._performRequest(map.get('id'));
    }));
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public buyProduct(product: Product): void {
    if (!product.permalink) return;

    // Open product real link
    this.window.open(product.permalink, '_blank');
  }

  private _performRequest(query: string): void {
    this._changeLoadingState(true);

    this.productService.getProductById(query).subscribe((res) => {
      if (!res) return;

      this.product = res;
      this.relatedCategories = this.productService
        .getRelatedCategories(res.categories);
      this.images = this.productService.fromPicturesRawArrayToImages(res.pictures, res);

      // this.productService.selectedProduct = res;
      this._changeLoadingState(false);
    });
  }

  private _changeLoadingState(state: boolean): void {
    this.isLoading = state;
  }
}
