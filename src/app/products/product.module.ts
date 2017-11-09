import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CollapsibleComponent } from './collapsible.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    ProductRoutingModule,
    SharedModule
  ],
  declarations: [CategoryListComponent, ProductDetailComponent, CollapsibleComponent]
})
export class ProductModule { }
