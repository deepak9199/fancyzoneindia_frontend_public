import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Products } from "../model/productModel";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(private firestore: AngularFirestore) { }

    FilterByPrice(minPrice: number, maxPrice: number): Observable<Products[]> {
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
                }).filter(product => product.price >= minPrice && product.price <= maxPrice); // Filter by subcategory
            })
        );
    }
    search(keyword: string): Observable<any[]> {
        const searchTerm = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
      
        return this.firestore.collection('products', ref => {
          return ref.where('category', '>=', searchTerm)
            .where('category', '<=', searchTerm + '\uf8ff')
            .orderBy('category')
    
        }).snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const data = a.payload.doc.data() as Products;
                const id = a.payload.doc.id;
      
                return { id, ...data };
              })
            )
          );
      }
      
      

}