import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule  
  ],
  providers: [
    CategoryService,
    ProductService
  ]
})
export class SharedModule { }
