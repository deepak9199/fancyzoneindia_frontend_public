import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCollection: AngularFirestoreCollection<any>;
 public cartItems$: Observable<any[]>;
  userId: any;
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private firestore: AngularFirestore, private toastr: ToastrService, private auth: AuthService) {
    this.cartCollection = this.firestore.collection('cart');
    this.cartItems$ = this.cartCollection.valueChanges({ idField: 'id' });
  }


  getCurrentUserId() {
    this.userId = this.auth.getCurrentUser()?.uid;
  }
  updateCartCount(count: number) {
    this.cartCountSubject.next(count);
  }
  createCart(item: any): void {
    const cartItemId = this.firestore.createId();
    const cartItem = { id: cartItemId, ...item }; // Include the cartItemId in the cartItem object
    this.cartCollection.doc(cartItemId).set(cartItem);
    this.toastr.success('Product added to cart');
  }

  getCart(itemId: string): Observable<any> {
    return this.cartCollection.doc(itemId).valueChanges();
  }

  getCarts(): Observable<any[]> {
    const userId = this.auth.getCurrentUser()?.uid;
    if (userId) {
      return this.firestore
        .collection<any>('cart', (ref) => ref.where('userId', '==', userId))
        .valueChanges();
    } else {
      return of([]); // Return an empty array if the user is not logged in
    }
    
  }

  updateQuantity(cartItemId: string, newQuantity: number): void {
    this.cartCollection.doc(cartItemId).update({ quantity: newQuantity })
      .then(() => {
        this.toastr.success('Quantity updated successfully!');
      })
      .catch((error) => {
        this.toastr.error('Error updating quantity:', error);
      });
  }

  updateCart(cartItem: any): void {
    const { id, ...updatedItem } = cartItem;
    const cartItemRef = this.cartCollection.doc(id);
  
    cartItemRef.update(updatedItem)
      .then(() => {
        this.toastr.success('Cart item updated successfully!');
      })
      .catch((error) => {
        this.toastr.error('Error updating cart item:', error);
      });
  }
  
  deleteCart(itemId: string): void {
    this.cartCollection.doc(itemId).delete()
      .then(() => {
        this.toastr.success('Item removed from cart successfully!');
      })
      .catch((error) => {
        this.toastr.error('Error removing item from cart:', error);
      });
  }

  clearCart(): void {
    this.cartItems$.pipe(
      map((items) => items.map((item) => item.id))
    ).subscribe((itemIds) => {
      itemIds.forEach((itemId) => {
        this.cartCollection.doc(itemId).delete();
      });
    });
  }

  getSubtotal(cartItem: any): number {
    return cartItem.price * cartItem.quantity;
  }

  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map((items) => {
        let total = 0;
        items.forEach((cartItem) => {
          total += this.getSubtotal(cartItem);
        });
        const gstAmount = (total * 18) / 100; // Calculate GST amount
        const totalWithGST = total + gstAmount; // Add GST to the total
        return totalWithGST;
      })
    );
  }

  getGstAmount(amount: number, gstPercentage: number): number {
    const gstAmount = (amount * gstPercentage) / 100;
    return gstAmount;
  }
}
