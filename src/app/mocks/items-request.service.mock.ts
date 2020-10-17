import itemMocks from '../mocks/data/item.mock.json';
import itemsMocks from '../mocks/data/items.mock.json';
import Product from '../models/product.model';
import ProductsList from '../models/productsList.model';
import suggestionsMocks from '../mocks/data/suggestions.mock.json';
import { of } from 'rxjs';

export function getItemsRequestServiceMock() {
  return {
    getProductList: jasmine.createSpy('getProductList').and.returnValue(of(itemsMocks)),
    getProduct: jasmine.createSpy('getProduct').and.returnValue(of(itemMocks)),
    getSuggestedQueries: jasmine.createSpy('getSuggestedQueries').and.returnValue(of(suggestionsMocks)),
  };
}
