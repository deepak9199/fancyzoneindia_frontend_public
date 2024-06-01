import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { CartModel } from 'src/app/model/cartModel';
import { OrderModel } from 'src/app/model/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartItems:any
  total: any
  userID:any;
  sub_total: any;
  order: OrderModel={
    orderId:this.generateUniqueRandomNumber(),
    first_name:'',
    last_name:'',
    address1:'',
    address2:'',
    country:'',
    state:'',
    city:'',
    pincode:'',
    email:'',
    contact:'',
    note:'',
    cartItems:[],
    status:''
  }
  currentUser!:any;
  @ViewChild('OrderForm') OrderForm!: NgForm;
  constructor(private cartService: CartService, private toast:ToastrService,   
    private authService: AuthService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
  this.currentUser= this.authService.getCurrentUser()?.uid
    this.getCart()
    this.total = this.cartService.getTotal();
    this.sub_total =  this.cartService.getCarts().pipe(
      map(cartItems => {
        let subtotal = 0;
        cartItems.forEach(cartItem => {
          subtotal += this.cartService.getSubtotal(cartItem);
        });
        return subtotal;
      })
    ); 
  }
  
  generateUniqueRandomNumber(): string {
    const min = 1000000000; // Smallest 10-digit number
    const max = 9999999999; // Largest 10-digit number
  
    const uniqueNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return uniqueNumber.toString();
  }
  getCart():void{
     this.cartService.getCarts().subscribe(data =>{
      this.cartItems =data
     });
  }
 
  placeOrder() {
    this.order.cartItems = this.cartItems;
    this.order.status = "requested";
    this.order.country = "India";
    this.order.orderId = this.generateUniqueRandomNumber();
    
    if (this.OrderForm.valid) {
      // Append orderId to each cartItem
    
  
      this.firestore.collection('orders').add({
        ...this.order,
        usrid: this.currentUser,
        createdTime: new Date()
      }).then(() => {
        // Order placed successfully
        this.toast.success("Placed order successfully");
        this.cartService.clearCart();
      }).catch((error) => {
        // Error placing order
        this.toast.error(error);
      });
    } else {
      this.toast.error("Something went wrong");
    }
  }
  
 
}

