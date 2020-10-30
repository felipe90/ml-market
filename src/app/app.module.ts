import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { HttpClientModule } from '@angular/common/http';
import { ItemsRequestService } from './services/items-request.service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { RelatedCategoriesComponent } from './components/related-categories/related-categories.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    RelatedCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AutoCompleteModule,
    FormsModule,
    ButtonModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    BreadcrumbModule,
    GalleriaModule,
    MatGridListModule
  ],
  providers: [
    ItemsRequestService,
    ProductService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
