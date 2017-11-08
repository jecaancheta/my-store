import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    AdminRoutingModule,
    HttpModule,
    SharedModule,
    NgbDropdownModule
  ],
  declarations: [
    AdminProductComponent,
    AdminCategoryComponent
  ]
})
export class AdminModule { }
