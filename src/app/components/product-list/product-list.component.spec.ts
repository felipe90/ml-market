import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getProductServiceMock } from '../../mocks/products.service.mock';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from 'src/app/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock = getProductServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
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
          }
        }
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
