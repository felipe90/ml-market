import Product from 'src/app/models/product.model';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getProductServiceMock } from 'src/app/mocks/products.service.mock';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from 'src/app/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productServiceMock = getProductServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
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
          provide:
            ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'mock id' })),
            queryParams: of({ id: 'mock id' }),
            params: of([{ id: 'mock id', }]),
          },
        },
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
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should', () => {
    it('buy product opening real link', () => {
      spyOn(component.window, 'open')

      const exp = new Product();
      exp.permalink = 'mocklink';
      component.buyProduct(exp)

      expect(component.window.open).toHaveBeenCalled();
    });

    it('NOT buy product opening real link', () => {
      const exp = new Product();
      exp.permalink = null;
      expect(component.buyProduct(exp)).toBeUndefined();
    });

    it('check page scroll and set sticky flag', () => {
      component.checkScroll();
      fixture.detectChanges();

      expect(component.isSticky).toBeFalsy();
    });
  });
});
