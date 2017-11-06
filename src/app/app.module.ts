import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { ModalContentComponent } from './shared/product-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    // ModalContentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ProductModule,
    AdminModule,
    SharedModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
