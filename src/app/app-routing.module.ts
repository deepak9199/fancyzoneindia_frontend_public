import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './auth.guard';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
    {path:'products',component:ProductsComponent},
    {path:'about',component:AboutComponent},
    {path:'product-detail/:id', component: ProductDetailsComponent},
    {path:'ipdate-product/:id', component: UpdateProductComponent},

    {path:'contact', component:ContactComponent},
    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'account',canActivate: [AuthGuard] ,component:MyAccountComponent, pathMatch:"full"},
    {path:'cart',canActivate:[AuthGuard] , component:CartComponent,pathMatch:"full"},
    {path:'checkout',canActivate: [AuthGuard] , component:CheckoutComponent,pathMatch:"full"},
    {path:'search/:key',component:SearchComponent},
    {path: 'information',
    loadChildren: () => import('./information/information-routing.module').then(m => m.InformationRoutingModule)}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
