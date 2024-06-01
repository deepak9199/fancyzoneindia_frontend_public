import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartModel } from 'src/app/model/cartModel';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/productService';
import mdVideo from 'lightgallery/plugins/video';
import mdThumbnail from 'lightgallery/plugins/thumbnail';
import mdShare from 'lightgallery/plugins/share';
import mdZoom from 'lightgallery/plugins/zoom';

import mdRotate from 'lightgallery/plugins/rotate';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

    product!: any;
    varient!: any;
    color:string[]=[]
    sizes:string[]=[]
    stocksCount!: Number;
    selectedSku: any;
    selectedVarient!: any;
    selectedColor!:any;
    cartCount!:number;
    userId:any  | undefined;
    selectedColorIndex: number = -1;
    selectedSizeIndex: number = -1;
    settings = {
      counter: true,  
      plugins: [mdZoom, mdVideo,mdThumbnail,mdShare,mdRotate]
    };
  
     @ViewChild('quantityInput', { static: false }) quantityInput!: ElementRef;
    constructor(
      private cartservice: CartService,
      private router: ActivatedRoute,
      private navigate:Router,
      private service: ProductsService,
      private toaster: ToastrService,
      private userService:AuthService,
    ) { 
    }
    getCurrentuserid(){
      this.userId = this.userService.getCurrentUser()?.uid
      // console.log(this.userId);
      
    }
    ngOnInit(): void {
      this.getProductDetails();
      this.getCurrentuserid();
      this.getcolors()
      
    }
  
    getProductDetails() {
      this.service
        .getProductById(this.router.snapshot.params['id'])
        .subscribe((product) => {
          this.product = product[0];
         
          this.getcolors();
          this.getsizes();
        });
    }
  
    getcolors() {
      if (this.product?.color_varient) {
        this.color = this.product?.color_varient.split(',');
        console.log(this.color);
        
      }
    }
    getsizes() {
      if (this.product?.size) {
        this.sizes = this.product?.size.split(',');
        console.log(this.sizes);
        
      }
    }
  
  
    updateVarient(i: number) {
      this.selectedSizeIndex=i
      this.selectedVarient = this.varient[i];
    }
    updatedColor(i:number){
      this.selectedColorIndex = i;
      this.selectedColor=this.color[i]
    }
    updateToCart(): void {
      if (this.product && this.selectedVarient && this.userService.isLoggedIn()) {
        const quantity = this.quantityInput.nativeElement.value;
        const cartItem: CartModel = {
          id:this.product.id,
          userId:this.userId,
          category: this.product.category,
          price: this.selectedVarient.price,
          sku: this.selectedVarient.sku,
          imageUrl: this.product.imageUrl[0],
          productSize: this.selectedVarient.size,
          quantity: quantity,
          color:this.selectedColor
        };
  
        try {
            this.cartservice.updateCart(cartItem)        
        } catch (error) {      
          this.toaster.error('Product not updated to cart');
        }
      } else
      this.navigate.navigate(['../login'])
    }

  }
