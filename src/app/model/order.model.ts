
import { CartModel } from "./cartModel";

export interface OrderModel {
    orderId:string,
    first_name:string,
    last_name:string,
    address1:string,
    address2:string,
    country:string,
    state:string,
    city:string,
    pincode:string,
    email:string,
    contact:string,
    note:string,
    cartItems:CartModel[],
    status:string
    
} 