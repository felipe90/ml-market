import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemsRequestService } from './items-request.service';
import { TestBed } from '@angular/core/testing';


describe('ItemsRequestService', () => {
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
    const backend = TestBed.bind(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
