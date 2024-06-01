import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FooterComponent } from './components/footer/footer.component';
import { environment } from 'src/environments/environment.prod';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';
import { QuickModelComponent } from './components/quick-model/quick-model.component';
import { HomeComponent } from './home/home.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './components/search/search.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent } from './components/header/header.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { UpdateProductComponent } from './update-product/update-product.component';
import { PopImageComponent } from './pop-image/pop-image.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    MyAccountComponent,
    MiniCartComponent,
    QuickModelComponent,
    SearchComponent,
    HeaderComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    UpdateProductComponent,
    PopImageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdbCarouselModule,
    LightgalleryModule,
    FormsModule,
    NgxPaginationModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatDialogModule,  
   AngularFireModule.initializeApp(environment.firebaseConfig),
   ToastrModule.forRoot()
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}], 
  bootstrap: [AppComponent]
})
export class AppModule {
}
