import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryResolver } from './../shared/category-resolver.service';
import { ProductResolver } from './../shared/product-resolver.service';

const routes: Routes = [
  { path: 'categories', component: ProductListComponent, resolve: { products: ProductResolver, categories: CategoryResolver } },
  { path: 'products', component: ProductListComponent, resolve: { products: ProductResolver, categories: CategoryResolver } },
  { path: 'products/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
