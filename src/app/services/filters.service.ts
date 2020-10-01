import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private siteId = '';
  private _availableFilters = [];
  private _availableSorts = [];
  private appliedSort = {}
  private appliedFilters = {}

  constructor(private requestService: RequestService) {
    this.requestService.getItems().pipe(take(1)).subscribe((res: any) => {
      this._availableFilters = res.available_filters
      this._availableSorts = res.available_sorts
      this.appliedSort = res.sort

      console.log(this._availableFilters)
    })
  }
}
