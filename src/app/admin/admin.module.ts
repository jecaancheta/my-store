import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DataTableDirective } from './data-table.directive';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    AdminProductComponent,
    AdminCategoryComponent,
    DataTableDirective
  ]
})
export class AdminModule { }
