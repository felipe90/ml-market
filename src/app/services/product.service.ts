import Image from '../models/image.model';
import Product from '../models/product.model';
import ProductsList from '../models/productsList.model';
import { Injectable } from '@angular/core';
import { ItemsRequestService } from './items-request.service';
import { map, take } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _productsList: ProductsList;
  private _selectedProduct;
  private _searchQuery: string;

  public selectedProductChange = new Subject<Product>();
  public onSelectedProductChange: Observable<Product> = this.selectedProductChange.asObservable();

  public get productsList(): ProductsList {
    return { ...this._productsList };
  }

  public set productsList(value: ProductsList) {
    this._productsList = { ...value };
  }

  public get selectedProduct(): Product {
    return this._selectedProduct;
  }

  public set selectedProduct(value: Product) {
    this._selectedProduct = value;
    this.selectedProductChange.next(this._selectedProduct);
  }

  public get searchQuery(): string {
    return this._searchQuery;
  }

  public set searchQuery(value: string) {
    this._searchQuery = value;
  }

  constructor(private requestService: ItemsRequestService) { }

  public getProductListByTitle(title: string): Observable<any> {
    const params = { title };

    return this.requestService.getProductList(params)
      .pipe(take(1));
  }

  public getProductById(productId: string): Observable<any> {
    return this.requestService.getProduct(productId)
      .pipe(take(1));
  }

  public getSuggestionsByQuery(query: string): Observable<any> {
    return this.requestService.getSuggestedQueries(query)
      .pipe(take(1))
      .pipe(map((res: any) => res.suggested_queries));
  }

  /**
   * Check if search query was performed
   */
  public checkCacheSearch(query: string): boolean {
    if (this.searchQuery === query) {
      return true;
    }
    this.searchQuery = query;
  }

  /**
   * Get categories and parse them to work as navigation link
   */
  public getRelatedCategories(categories: string[]): any {
    if (!categories) return;

    return categories
      .map((cat) => {
        const parsedUrl = cat.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return {
          label: cat,
          url: `/items?search=${parsedUrl}`
        } as MenuItem;
      });
  }


  /**
   * Get categories and parse them to work as navigation link
   */
  public fromPicturesRawArrayToImages(pictures: any[], product: Product): Image[] {
    if (!pictures) return;

    return pictures
      .map((img, index) => {
        return {
          title: `${product.title}_${index}`,
          thumbnailImageSrc: img.secure_url,
          previewImageSrc: img.secure_url,
          alt: `${product.title}_${index}`
        } as Image;
      });
  }
}
