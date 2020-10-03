import { ItemsRequestService } from './ItemsRequest.service';
import { TestBed } from '@angular/core/testing';


describe('ItemsRequestService', () => {
  let service: ItemsRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
