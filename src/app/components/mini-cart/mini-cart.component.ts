import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css'],
})
export class MiniCartComponent {
  cartItems!: any;
  total$: Observable<number> | null = null;
  sub_total: any;
  gstAmount: number = 0.18; // Replace with your actual GST amount
  constructor(
    private elementRef: ElementRef,
    private cartService: CartService,
    private router: Router,
    private auth:AuthService
  ) {}
  ngOnInit(): void {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';

    this.elementRef.nativeElement.appendChild(s);
    this.total$ = this.cartService.getTotal();
    this.sub_total = this.cartService.getCarts().pipe(
      map((cartItems$) => {
        let subtotal = 0;
        cartItems$.forEach((cartItem) => {
          subtotal += this.cartService.getSubtotal(cartItem);
        });
        return subtotal;
      })
    );
    this.getCartItems();
  }

  routeToCart() {
    this.router.navigate(['cart']);
  }
  routeToCheckout() {
    this.router.navigate(['checkout']);
  }
  getCartItems() {
    this.cartService.getCarts().subscribe((data) => {
      this.cartItems = data;
    });
  }
  removeItem(id: any) {
    this.cartService.deleteCart(id);
    this.getCartItems();
  }
}
