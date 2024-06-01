import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems!: any;
  total!: any;
  sub_total!: any;
  userId: any;
  cartCount!:any;
  newQuantities: { [cartItemId: string]: number } = { cartItemId: 1 };
  @ViewChild('quantityInput', { static: false }) quantityInput!: ElementRef;

  constructor(private cartService: CartService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.getCart();
    this.total = this.cartService.getTotal();
    this.sub_total = this.cartService.getCarts().pipe(
      map((cartItems) => {
        let subtotal = 0;
        cartItems.forEach((cartItem) => {
          subtotal += this.cartService.getSubtotal(cartItem);
        });
        return subtotal;
      })
    );
  }
  getCart(): void {
    this.cartService.getCarts().subscribe((data) => {
      this.cartItems = data;
      this.cartCount =data.length
      this.updateCartCount()
      
    });
  }
updateCartCount() {
  // Update the cartCount value in the shared service
  this.cartService.updateCartCount(this.cartCount);
  
}

  updateQuantity(cartId: any) {
    this.cartService.updateQuantity(
      cartId,
      this.quantityInput.nativeElement.value
    );
  }

  removeCart(id: any) {
    this.cartService.deleteCart(id);
  }
  clearCart(): void {
    this.cartService.clearCart();
    this.toast.success('Cart cleared successfully!');

    this.cartItems = [];
    this.total = 0;
  }
}
