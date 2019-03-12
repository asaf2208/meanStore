import { PiechartDirective } from './d3graph';
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddBranchComponent } from './branches/add-branch/add-branch.component';
import { Globals } from './globals';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BranchesComponent } from './branches/branches.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BranchComponent } from './branch/branch.component';
import { DisplayUsdPipe } from './display-usd.pipe';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { AgmCoreModule } from '@agm/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { EditBranchComponent } from './branches/edit-branch/edit-branch.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';



const config: SocketIoConfig = { url: 'http://localhost:4000', options: {withCredentials: false} };


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
    BranchesComponent,
    FooterComponent,
    ProductComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    BranchComponent,
    DisplayUsdPipe,
    GooglemapsComponent,
    AddProductComponent,
    EditProductComponent,
    AddBranchComponent,
    EditBranchComponent,
    AdminComponent,
    PiechartDirective,
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAAXZyutzornngMjFPiS7c8F5J0W8hxjX4"
     }),
    BrowserModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'branches',
        component: BranchesComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  entryComponents: [AddProductComponent,EditProductComponent,AddBranchComponent,EditBranchComponent],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
