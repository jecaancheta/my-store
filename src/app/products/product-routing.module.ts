import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryResolver } from './../shared/category-resolver.service';
import { ProductResolver } from './../shared/product-resolver.service';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent, resolve: { products: ProductResolver, categories: CategoryResolver } },
  { path: 'products/:productId', component: ProductDetailComponent },
  { path: 'categories/:categoryId', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
