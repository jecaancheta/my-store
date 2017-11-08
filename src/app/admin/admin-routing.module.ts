import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminAuthGuard } from '../admin-authguard';

const routes: Routes = [
  // { path: 'manage/category',  component: AdminCategoryComponent, canActivate: [AdminAuthGuard] },
  // { path: 'manage/product', component: AdminProductComponent, canActivate: [AdminAuthGuard] }
    { path: 'manage/category',  component: AdminCategoryComponent },
  { path: 'manage/product', component: AdminProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
