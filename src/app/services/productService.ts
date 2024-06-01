import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Products } from "../model/productModel";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private firestore: AngularFirestore) { }
  getProductsByCategory(category: string): Observable<Products[]> {
    // Get a reference to the products collection in Firestore
    const productsCollectionRef = this.firestore.collection('products');

    // Use a snapshotChanges() method to get an Observable of the products data
    return productsCollectionRef.snapshotChanges().pipe(
      // Use a map operator to transform the data into an array of Product objects
      map(products => {
        return products.map(product => {
          const data = product.payload.doc.data() as Products; // Cast the data to a Product object
          const id = product.payload.doc.id; // Get the document ID
          return { id, ...data }; // Spread the data and ID properties into a new object
        }).filter(product => product.category === category); // Filter by category
      })
    );
  }

  getProductById(id: any): Observable<any> {
    // Get a reference to the products collection in Firestore
    const productsCollectionRef = this.firestore.collection('products');

    // Use a snapshotChanges() method to get an Observable of the products data
    return productsCollectionRef.snapshotChanges().pipe(
      // Use a map operator to transform the data into an array of Product objects
      map(products => {
        return products.map(product => {
          const data = product.payload.doc.data() as Products; // Cast the data to a Product object
          const id = product.payload.doc.id; // Get the document ID
          return { id, ...data }; // Spread the data and ID properties into a new object
        }).filter(product => product.id === id); // Filter by subcategory
      })
    );
  }
  getProducts(): Observable<Products[]> {
    // Get a reference to the products collection in Firestore
    const productsCollectionRef = this.firestore.collection('products');

    // Use a snapshotChanges() method to get an Observable of the products data
    return productsCollectionRef.snapshotChanges().pipe(
      // Use a map operator to transform the data into an array of Product objects
      map(products => {
        return products.map(product => {
          const data = product.payload.doc.data() as Products; // Cast the data to a Product object
          const id = product.payload.doc.id; // Get the document ID
          return { id, ...data }; // Spread the data and ID properties into a new object
        }) // Filter by subcategory
      })
    );
  }

 


}