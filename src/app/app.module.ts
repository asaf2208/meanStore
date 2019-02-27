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
  ],
  imports: [
    BrowserModule,
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
        path: 'about',
        component: AboutComponent
      },
      { 
        path: 'signup',
        component: SignupComponent
      },
      { 
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
