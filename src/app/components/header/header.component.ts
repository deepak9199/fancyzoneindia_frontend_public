import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { CategoryService } from 'src/app/services/categoryService';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  category: any[] = [];
  subscription!: Subscription;
  cartCount = 0;
  userId: any;
  isSignIn = false;

  constructor(
    private authService: AuthService,
    private catService: CategoryService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserid();
    this.getCategories();
    this.checkSignInStatus();
    this.subscribeToCartCount();
  }

  getUserid(): void {
    this.userId = this.authService.getCurrentUser();
  }

  checkSignInStatus(): void {
    this.isSignIn = this.authService.isLoggedIn();
  }

  subscribeToCartCount(): void {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  signOut(): void {
    this.authService.logout();
    this.isSignIn = false;
  }

  getCategories(): void {
    this.subscription = this.catService.getCategories().subscribe((data) => {
      this.category = data;
    });
  }

  onSearchChange(val: string): void {
    this.router.navigate([`search/${val}`]);
  }
}
