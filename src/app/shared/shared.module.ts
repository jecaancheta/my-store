import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CategoryResolver } from './category-resolver.service';
import { ProductResolver } from './product-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    CategoryService,
    ProductService,
    ProductResolver,
    CategoryResolver
  ]
})
export class SharedModule { }
