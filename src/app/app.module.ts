import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AdminComponent } from './admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material';

import { AddProductComponent } from './products/add-product/add-product.component';

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
    AdminComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
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
        path: 'admin',
        component: AdminComponent
      },
      { 
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  entryComponents: [
    AddProductComponent
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
