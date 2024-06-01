import { Component, HostListener, OnInit } from '@angular/core';
import { ProductsService } from '../services/productService';

import { CartService } from '../services/cart.service';
import { QuickViewService } from '../services/quick.service';
import { SliderService } from '../services/slider.service';
import { OtherServices } from '../services/Others.Service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import mdZoom from 'lightgallery/plugins/zoom';
import mdVideo from 'lightgallery/plugins/video';
import mdThumbnail from 'lightgallery/plugins/thumbnail';
import mdShare from 'lightgallery/plugins/share';
import mdRotate from 'lightgallery/plugins/rotate';
import { CategoryService } from '../services/categoryService';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isDesktopView: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isDesktopView = window.innerWidth >= 800;
  }
  categories: any;
  banners:any;
  slider: any;
  testimonials: any[] = [];
  featuredProducts: any;
  halfSleeve:any;
  fullSleeve:any;
  working_hours: any;
  settings = {
    counter: true,

    plugins: [mdZoom, mdVideo, mdThumbnail, mdShare, mdRotate]
  };
  constructor(
    private productService: ProductsService,
    private catservice:CategoryService,
    private service: CartService,
    private quickViewService: QuickViewService,
    private otherService: OtherServices,
    private sliderService: SliderService,
    private otherservices: OtherServices,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getCategory();
    this.getWorkingHours()
    this.getTestimonials();
    this.getFeaturedProducts()
    this.getfullSleeveProducts()
    this.gethalfSleeveProducts()
    this.getSlider();
    this.getHomebanner()
  
    //  this.otherService.getHomeBanner().subscribe(data =>{ this.homeBanner = data})
  }

  getSlider() {
    this.sliderService.getSliders().subscribe(data => {
      this.slider = data;
    })
  }
  getWorkingHours() {
    this.otherService.getworkinghours().subscribe(data => {
      this.working_hours = data
    })

  }
  getCategory():void{
    this.catservice.getCategories().subscribe( data =>{
      this.categories =data;
      console.log(this.categories);
      
    })
  }
getHomebanner(){
  this.otherService.getHomeBanner().subscribe( data =>{
    this.banners = data;
  })
}
  getFeaturedProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.featuredProducts = data.filter((product) => product.featured === true);
      console.log(this.featuredProducts);
      
    });
  }
  gethalfSleeveProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.halfSleeve = data.filter((product) => product.half_sleeve === true);
      
    });
  }
  getfullSleeveProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.fullSleeve = data.filter((product) => product.full_sleeve === true);
    });
  }
  navigateToShop(category: string) {
    const encodedSubcategory = encodeURIComponent(category);
    this.router.navigate(['../products'], {
      queryParams: { category: encodedSubcategory }
    });
  }
  getTestimonials() {
    this.otherService.getTestimonial().subscribe(data => {
      this.testimonials = data


    })
  }
  openQuickView(product: any) {
    this.quickViewService.setProduct(product);
  }


}

