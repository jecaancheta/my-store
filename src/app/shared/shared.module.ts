import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryService } from './category.service';
import { ProductService } from './product.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CategoryService,
    ProductService
  ],
  declarations: []
})
export class SharedModule { }
