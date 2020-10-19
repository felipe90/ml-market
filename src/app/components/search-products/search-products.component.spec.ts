import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync
  } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getProductServiceMock } from 'src/app/mocks/products.service.mock';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchProductsComponent } from './search-products.component';


describe('SearchProductsComponent', () => {
  let suggestionQuery = 'ipad';
  let component: SearchProductsComponent;
  let router: Router;
  let productService: ProductService;
  let fixture: ComponentFixture<SearchProductsComponent>;
  let productServiceMock = getProductServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchProductsComponent],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceMock
        },
        {
          provide: HttpClient,
          useClass: HttpClientTestingModule
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({ search: 'mock search' })),
            queryParams: of({ search: 'mock search' }),
            params: of([{ search: 'mock search' }])
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl'),
            events: of(null),
          }
        },
        RouterTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductsComponent);
    productService = TestBed.inject(ProductService)
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should', () => {
    it('perform suggestion search', waitForAsync(() => {
      component.searchSuggestions({ query: suggestionQuery });

      fixture.whenStable().then(() => {
        expect(productService.getSuggestionsByQuery).toHaveBeenCalled();
      });
    }));

    it('perform suggestion search on keyup', waitForAsync(() => {
      component.selectedValue = "mock search";
      const event = { type: 'keyup', keyCode: 13 };
      fixture.detectChanges();

      component.searchProducts(event);

      fixture.whenStable().then(() => {
        expect(router.navigateByUrl).toHaveBeenCalled();
      });
    }));

    it('perform suggestion search on click', waitForAsync(() => {
      component.selectedValue = "mock search";
      const event = { type: 'click' };
      fixture.detectChanges();

      component.searchProducts(event);

      fixture.whenStable().then(() => {
        expect(router.navigateByUrl).toHaveBeenCalled();
      });
    }));

    it('go home screen', waitForAsync(() => {
      component.selectedValue = "mock search";
      fixture.detectChanges();

      component.goToHome();

      fixture.whenStable().then(() => {

        expect(router.navigate).toHaveBeenCalled();
        expect(component.selectedValue).toBe('');
      });
    }));
  });
});
