import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SliderModel } from "../model/sliderModel";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private firestore: AngularFirestore) { }

  getSliders(): Observable<SliderModel[]> {
    // Get a reference to the SliderModel collection in Firestore
    const SliderModelCollectionRef = this.firestore.collection('sliderImage');

    // Use a snapshotChanges() method to get an Observable of the SliderModel data
    return SliderModelCollectionRef.snapshotChanges().pipe(
      // Use a map operator to transform the data into an array of Product objects
      map(SliderModel => {
        return SliderModel.map(images => {
          const data = images.payload.doc.data() as SliderModel; // Cast the data to a Product object
          const id = images.payload.doc.id; // Get the document ID
          return { id, ...data }; // Spread the data and ID properties into a new object
        }) // Filter by subcategory
      })
    );
  }
  
}
