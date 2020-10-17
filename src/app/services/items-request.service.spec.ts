import itemMocks from '../mocks/data/item.mock.json';
import itemsMocks from '../mocks/data/items.mock.json';
import suggestionsMocks from '../mocks/data/suggestions.mock.json';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { isEqual } from 'lodash';
import { ItemsRequestService } from './items-request.service';
import { TestBed } from '@angular/core/testing';

describe('ItemsRequestService', () => {
  let query = 'ipad';
  let queryId = 'MCO546262178';
  let suggestionQuery = 'ipad';
  let searchQuery = { title: query };
  let queryUrl = `http://localhost:8080/api/items?q=title=${query}`;
  let queryUrlNoParams = `http://localhost:8080/api/items?q`;
  let queryIdUrl = `http://localhost:8080/api/items/${queryId}`;
  let suggestionsUrl = `https://http2.mlstatic.com/resources/sites/MCO/autosuggest?showFilters=true&limit=6&api_version=2&q=${suggestionQuery}`;

  let service: ItemsRequestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ItemsRequestService,
        {
          provide: HttpXhrBackend,
          useClass: HttpTestingController
        }
      ]
    });
    service = TestBed.inject(ItemsRequestService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should', () => {
    it('get product list with params', (done) => {
      service.getProductList(searchQuery).subscribe((res) => {
        expect(isEqual(res, itemsMocks)).toBeTruthy();
        done();
      })

      const req = httpTestingController.expectOne(queryUrl);
      expect(req.request.method).toBe('GET')
      req.flush(itemsMocks);
    });

    it('get product list without params', (done) => {
      service.getProductList().subscribe((res) => {
        expect(isEqual(res, itemsMocks)).toBeTruthy();
        done();
      })

      const req = httpTestingController.expectOne(queryUrlNoParams);
      expect(req.request.method).toBe('GET')
      req.flush(itemsMocks);
    });

    it('handle error event when get product list', (done) => {
      spyOn(service, 'handleError').and.callThrough();

      service.getProductList(searchQuery).subscribe(
        _ => {
          done();
        },
        (err) => {
          expect(err).toBeTruthy();
          expect(service.handleError).toHaveBeenCalled();
        });

      const req = httpTestingController.expectOne(queryUrl);
      expect(req.request.method).toBe('GET')
      req.error(new ErrorEvent('fail'));
    });

    it('get product item', (done) => {
      service.getProduct(queryId).subscribe((res) => {
        expect(isEqual(res, itemMocks)).toBeTruthy();
        done();
      })

      const req = httpTestingController.expectOne(queryIdUrl);
      expect(req.request.method).toBe('GET')
      req.flush(itemMocks);
    });

    it('handle error event when get product item', (done) => {
      spyOn(service, 'handleError').and.callThrough();

      service.getProduct(queryId).subscribe(
        _ => {
          done();
        },
        (err) => {
          expect(err).toBeTruthy();
          expect(service.handleError).toHaveBeenCalled();
        });

      const req = httpTestingController.expectOne(queryIdUrl);
      expect(req.request.method).toBe('GET')
      req.error(new ErrorEvent('fail'));
    });

    it('get suggestions', (done) => {
      service.getSuggestedQueries(suggestionQuery).subscribe((res) => {
        expect(isEqual(res, suggestionsMocks)).toBeTruthy();
        done();
      })

      const req = httpTestingController.expectOne(suggestionsUrl);
      expect(req.request.method).toBe('GET')
      req.flush(suggestionsMocks);
    });
  });
});
