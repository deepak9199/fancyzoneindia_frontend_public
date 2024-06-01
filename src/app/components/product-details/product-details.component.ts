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
import { MatDialog } from '@angular/material/dialog';
import { PopImageComponent } from 'src/app/pop-image/pop-image.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product!: any;
  color: string[] = [];
  sizes: string[] = [];
  stocksCount!: number;
  selectedSku: any;
  selectedVarient: any; // Make sure this is the correct variable
  selectedColor: any;
  cartCount!: number;
  userId: any;
  selectedColorIndex: number = -1;
  selectedSizeIndex: number = -1;
  settings = {
    counter: true,
    plugins: [mdZoom, mdVideo, mdThumbnail, mdShare, mdRotate]
  };

  @ViewChild('quantityInput', { static: false }) quantityInput!: ElementRef;
  @ViewChild('sizeInput', { static: false }) sizeInput!: ElementRef;
  constructor(
    private cartservice: CartService,
    private router: ActivatedRoute,
    private navigate: Router,
    private service: ProductsService,
    private toaster: ToastrService,
    private userService: AuthService,
    public dialog: MatDialog,
  ) { }

  getCurrentuserid() {
    this.userId = this.userService.getCurrentUser()?.uid;
    console.log(this.userId);
  }
  openDialog(image: string): void {
    const dialogRef = this.dialog.open(PopImageComponent, {
      data: { imagesselected: image }
    });
  }
  ngOnInit(): void {
    this.getProductDetails();
    this.getCurrentuserid();
    this.getcolors();
  }

  getProductDetails() {
    this.service.getProductById(this.router.snapshot.params['id']).subscribe((product) => {
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
    this.selectedSizeIndex = i;
    this.selectedVarient = this.sizes[i]; // Make sure this is the correct assignment
  }

  updatedColor(i: number) {
    this.selectedColorIndex = i;
    this.selectedColor = this.color[i];
  }

  addToCart(): void {
    if (this.product && this.userId) {
      const quantity = this.quantityInput.nativeElement.value;
      const size = this.sizeInput.nativeElement.value;
      const cartItem: CartModel = {
        userId: this.userId,
        category: this.product.category,
        price: this.product.price,
        sku: this.product.sku,
        imageUrl: this.product.imageUrl1,
        productSize: this.sizes[this.selectedSizeIndex], // Make sure this is the correct property
        quantity: quantity,
        color: this.selectedColor
      };

      try {
        console.log(this.selectedVarient);

        console.log(cartItem);
        this.cartservice.createCart(cartItem);
      } catch (error) {
        this.toaster.error('Please select size and color of your choice');
      }
    } else {
      this.navigate.navigate(['../login']);
    }
  }
}
