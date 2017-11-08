import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CollapsibleComponent } from './collapsible.directive';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ProductListComponent, ProductDetailComponent, CollapsibleComponent]
})
export class ProductModule { }
