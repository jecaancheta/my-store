import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { HomeComponent } from './home/homepage.component';
import { LoginComponent } from './login/login.component';
import { LoginAuthGuard } from './login-authguard';

const routes: Routes = [
    { path: '', redirectTo: '/categories', pathMatch: 'full' }
    // { path: 'login', component: LoginComponent },
    // { path: '404', component: Error404Component  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
