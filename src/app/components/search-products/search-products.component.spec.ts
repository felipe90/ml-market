import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getProductServiceMock } from 'src/app/mocks/products.service.mock';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchProductsComponent } from './search-products.component';


describe('SearchProductsComponent', () => {
  let component: SearchProductsComponent;
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
            navigateByUrl : jasmine.createSpy('navigateByUrl'),
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
