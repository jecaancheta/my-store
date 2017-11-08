import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { Error404Component } from './errors/404.component';
import { HomeComponent } from './home/homepage.component';
import { AdminAuthGuardService } from './admin-authguard.service';
import { AdminAuthGuard } from './admin-authguard';
import { LoginAuthGuard } from './login-authguard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ProductModule,
    AdminModule,
    NgbModule.forRoot()
  ],
  providers: [LoginService, AdminAuthGuardService, AdminAuthGuard, LoginAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
