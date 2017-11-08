import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from './category.service';
import { ProductService } from './product.service';

import { CategoryResolver } from './category-resolver.service';
import { ProductResolver } from './product-resolver.service';

import { AlertComponent } from './alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CategoryService,
    ProductService,
    ProductResolver,
    CategoryResolver
  ],
  declarations: [
    AlertComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    AlertComponent
  ]
})
export class SharedModule { }
