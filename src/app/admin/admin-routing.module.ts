import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminAuthGuard } from '../admin-authguard';
import { CategoryResolver } from './../shared/category-resolver.service';
import { ProductResolver } from '../shared/product-resolver.service';

const routes: Routes = [
  // { path: 'manage/category',  component: AdminCategoryComponent, canActivate: [AdminAuthGuard] },
  // { path: 'manage/product', component: AdminProductComponent, canActivate: [AdminAuthGuard] }
    { path: 'manage/category',  component: AdminCategoryComponent, resolve: { categories: CategoryResolver } },
  { path: 'manage/product', component: AdminProductComponent, resolve: { products: ProductResolver, categories: CategoryResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
