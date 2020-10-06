import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-related-categories',
  templateUrl: './related-categories.component.html',
  styleUrls: ['./related-categories.component.scss']
})
export class RelatedCategoriesComponent implements OnInit {

  @Input() relatedCategories: MenuItem[] = [];
  public indexCategory: MenuItem;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.indexCategory = { label: `Búsquedas relacionadas`, disabled: true };
  }

  public selectCategory(event) {
    this.router.navigate([event.item.url], { relativeTo: this.route });
  }
}
