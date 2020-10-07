import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-related-categories',
  templateUrl: './related-categories.component.html',
  styleUrls: ['./related-categories.component.scss']
})
export class RelatedCategoriesComponent implements OnInit {

  @Input() relatedCategories: MenuItem[] = [];
  @Input() isDetailView: boolean = false;
  public indexCategory: MenuItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.indexCategory = this.isDetailView ?
    { label: `Búsquedas relacionadas`, disabled: true } :
    { label: `También puede interesarte`, disabled: true };
  }

  public selectCategory(event) {
    this.router.navigate([event.item.url], { relativeTo: this.route });
  }
}
