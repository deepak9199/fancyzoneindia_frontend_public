import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartModel } from 'src/app/model/cartModel';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/productService';
import { QuickViewService } from 'src/app/services/quick.service';
import mdZoom from 'lightgallery/plugins/zoom';
import mdVideo from 'lightgallery/plugins/video';
import mdThumbnail from 'lightgallery/plugins/thumbnail';
import mdShare from 'lightgallery/plugins/share';
import mdRotate from 'lightgallery/plugins/rotate';

@Component({
  selector: 'app-quick-model',
  templateUrl: './quick-model.component.html',
  styleUrls: ['./quick-model.component.css']
})
export class QuickModelComponent implements OnInit {
  data!:any
  selectedSku!:any
  varient!:any
  color!:any
  selectedColor!:any;
  selectedVarient!:any
  selectedColorIndex: number = -1;
  selectedSizeIndex: number = -1;
  
  @ViewChild('quantityInput', { static: false }) quantityInput!: ElementRef;
  userId: string | undefined;
  settings = {
    counter: true,  
    plugins: [mdZoom, mdVideo,mdThumbnail,mdShare,mdRotate]
  };
constructor(
  private service:QuickViewService,
  private cartService:CartService,
  private proservice:ProductsService,
  private userService:AuthService,
  private toaster: ToastrService,
  private router:Router,


){}

ngOnInit(): void {
  this.getData()
}
getData(){
this.service.getProduct().subscribe( product =>{
  this.data =product
  this.selectedSku = this.data?.sku;    
  this.getcolors();
})
 
}
getcolors() {
  if (this.data?.color_varient) {
    this.color = this.data?.color_varient.split(',');
    console.log(this.color);
    
  }
}
addToCart(): void {
  if (this.data && this.selectedVarient && this.userService.isLoggedIn()) {
    const quantity = this.quantityInput.nativeElement.value;
    const cartItem: CartModel = {
      userId:this.userId,
      category: this.data.category,
      price: this.selectedVarient.price,
      sku: this.selectedVarient.sku,
      imageUrl: this.data.imageUrl[0],
      productSize: this.selectedVarient.size,
      quantity: quantity,
      color:this.selectedColor
    };

    try {
      
        this.cartService.createCart(cartItem)        
    } catch (error) {      
      this.toaster.error('Product not added to cart');
    }
  } else
  this.router.navigate(['../login'])
}

updatedColor(i:number){
  this.selectedColorIndex = i;
  this.selectedColor=this.color[i]
}
updateVarient(i: number) {
  this.selectedSizeIndex=i
  this.selectedVarient = this.varient[i];
}
}
