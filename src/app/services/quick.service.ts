import { Injectable, OnInit } from '@angular/core';
import { CartModel } from '../model/cartModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuickViewService implements OnInit {
  private product$: BehaviorSubject<CartModel> = new BehaviorSubject<any>(null);

  constructor() { }

  ngOnInit(): void {
    this.getProduct();
  }

  setProduct(product: CartModel) {
    this.product$.next(product);
  }

  getProduct(): Observable<CartModel> {
    return this.product$.asObservable();
  }
}
