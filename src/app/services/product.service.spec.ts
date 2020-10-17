import itemMocks from '../mocks/data/item.mock.json';
import itemsMocks from '../mocks/data/items.mock.json';
import Product from '../models/product.model';
import ProductsList from '../models/productsList.model';
import suggestionsMocks from '../mocks/data/suggestions.mock.json';
import { getItemsRequestServiceMock } from '../mocks/items-request.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { isEqual } from 'lodash';
import { ItemsRequestService } from './items-request.service';
import { MenuItem } from 'primeng/api';
import { ProductService } from './product.service';
import { TestBed } from '@angular/core/testing';

describe('ProductService', () => {
  let service: ProductService;
  let itemsRequestService: ItemsRequestService;
  let itemsRequestServiceMock = getItemsRequestServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductService,
        {
          provide: ItemsRequestService,
          useValue: itemsRequestServiceMock
        },
      ]
    });
    service = TestBed.inject(ProductService);
    itemsRequestService = TestBed.inject(ItemsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should have set and get of', () => {
    it('productList', () => {
      const exp = {};
      service.productsList = new ProductsList();

      expect(isEqual(service.productsList, exp)).toBeTruthy();
    });

    it('selectedProduct', () => {
      const exp = new Product();
      service.selectedProduct = exp;

      expect(isEqual(service.selectedProduct, exp)).toBeTruthy();
    });

    it('searchQuery', () => {
      const exp = 'search';
      service.searchQuery = exp;

      expect(isEqual(service.searchQuery, exp)).toBeTruthy();
    });
  })

  describe('should retrieve', () => {
    it('products list by title', (done) => {
      const exp = itemsMocks;
      service.getProductListByTitle('mockSearch').subscribe((res) => {
        expect(isEqual(res, exp)).toBeTruthy();
        done();
      });
    });

    it('product by id', (done) => {
      const exp = itemMocks;
      service.getProductById('mockId').subscribe((res) => {
        expect(isEqual(res, exp)).toBeTruthy();
        done();
      });
    });

    it('suggestions by query', (done) => {
      const exp = suggestionsMocks;
      service.getSuggestionsByQuery('mockQuery').subscribe((res) => {
        expect(isEqual(res, exp.suggested_queries)).toBeTruthy();
        done();
      });
    });
  });

  describe('should check search cache', () => {
    it('and change search query', () => {
      const q = 'query';
      const exp = 'searchMock';

      service.checkCacheSearch(q);
      service.checkCacheSearch(exp);

      expect(service.searchQuery).toBe(exp);
    });

    it('and dont change search query', () => {
      const exp = 'searchMock';
      service.checkCacheSearch(exp);
      service.checkCacheSearch(exp);

      expect(service.searchQuery).toBe(exp);
    });
  });

  describe('should', () => {
    it('transform categories string to related categories', () => {
      const exp = <MenuItem>{
        label: 'Computación',
        url: '/items?search=Computacion',
      };
      const res = service.getRelatedCategories(itemMocks.categories);

      expect(isEqual(res[0], exp)).toBeTruthy();
    });

    it('dont transform categories string to related categories', () => {
      const exp = service.getRelatedCategories(null);
      expect(exp).toBeUndefined();
    });

    it('transform pictures raw array to images', () => {
      const exp = {
        alt: "Apple iPad 32 Gb Wifi Séptima Generación_0",
        previewImageSrc: "https://mco-s1-p.mlstatic.com/811726-MCO40176199118_122019-O.jpg",
        thumbnailImageSrc: "https://mco-s1-p.mlstatic.com/811726-MCO40176199118_122019-O.jpg",
        title: "Apple iPad 32 Gb Wifi Séptima Generación_0",
      };

      const product = itemMocks as unknown as Product;
      const res = service.fromPicturesRawArrayToImages(itemMocks.pictures, product);

      expect(isEqual(res[0], exp)).toBeTruthy();
    });

    it('dont transform pictures raw array to images', () => {
      const exp = service.fromPicturesRawArrayToImages(null, null);
      expect(exp).toBeUndefined();
    });
  });
});
