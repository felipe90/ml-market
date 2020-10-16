import itemMocks from '../mocks/data/item.mock.json';
import itemsMocks from '../mocks/data/items.mock.json';
import suggestions from '../mocks/data/suggestions.mock.json';
import { of } from 'rxjs';

export function getProductServiceMock() {
  return {
    getProductListByTitle: jasmine.createSpy('getProductListByTitle').and.returnValue(of(itemsMocks)),
    getProductById: jasmine.createSpy('getProductById').and.returnValue(of(itemMocks)),
    getSuggestionsByQuery: jasmine.createSpy('getSuggestionsByQuery').and.returnValue(of(suggestions)),
    checkCacheSearch: jasmine.createSpy('checkCacheSearch'),
    getRelatedCategories: jasmine.createSpy('getRelatedCategories'),
    fromPicturesRawArrayToImages: jasmine.createSpy('fromPicturesRawArrayToImages'),
  };
}
