import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpXhrBackend } from '@angular/common/http';
import { ItemsRequestService } from './items-request.service';
import { TestBed } from '@angular/core/testing';


describe('ItemsRequestService', () => {
  let service: ItemsRequestService;

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
    service = TestBed.inject(ItemsRequestService);

    const backend = TestBed.bind(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
