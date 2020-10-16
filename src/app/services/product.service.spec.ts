import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpXhrBackend } from '@angular/common/http';
import { ProductService } from './product.service';
import { TestBed } from '@angular/core/testing';


describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HttpXhrBackend,
          useClass: HttpTestingController
        }
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
