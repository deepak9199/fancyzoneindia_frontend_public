import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HomeBannerModel } from "../model/homebanner.Model";
import { TeamModel } from "../model/team.model";
import { WorkingModel } from "../model/workingHours";

@Injectable({
  providedIn: 'root'
})
export class OtherServices {

  constructor(private firestore: AngularFirestore) { }

  getHomeBanner(): Observable<HomeBannerModel[]> {
    // Get a reference to the HomeBannerModel collection in Firestore
    const HomeBannerModelCollectionRef = this.firestore.collection('home_banner');

    // Use a snapshotChanges() method to get an Observable of the HomeBannerModel data
    return HomeBannerModelCollectionRef.snapshotChanges().pipe(
      // Use a map operator to transform the data into an array of Product objects
      map(HomeBannerModel => {
        return HomeBannerModel.map(images => {
          const data = images.payload.doc.data() as HomeBannerModel; // Cast the data to a Product object
          const id = images.payload.doc.id; // Get the document ID
          return { id, ...data }; // Spread the data and ID properties into a new object
        }) // Filter by subcategory
      })
    );
  }
  getTeam(): Observable<TeamModel[]> {
    // Get a reference to the TeamModel collection in Firestore
    const TeamModelCollectionRef = this.firestore.collection('team');

    // Use a snapshotChanges() method to get an Observable of the TeamModel data
    return TeamModelCollectionRef.snapshotChanges().pipe(
      // Use a map operator to transform the data into an array of Product objects
      map(TeamModel => {
        return TeamModel.map(images => {
          const data = images.payload.doc.data() as TeamModel; // Cast the data to a Product object
          const id = images.payload.doc.id; // Get the document ID
          return { id, ...data }; // Spread the data and ID properties into a new object
        }) // Filter by subcategory
      })
    );
  }
  getTestimonial(): Observable<TeamModel[]> {
    // Get a reference to the TeamModel collection in Firestore
    const TeamModelCollectionRef = this.firestore.collection('testimonials');

    // Use a snapshotChanges() method to get an Observable of the TeamModel data
    return TeamModelCollectionRef.snapshotChanges().pipe(
      // Use a map operator to transform the data into an array of Product objects
      map(TeamModel => {
        return TeamModel.map(images => {
          const data = images.payload.doc.data() as TeamModel; // Cast the data to a Product object
          const id = images.payload.doc.id; // Get the document ID
          return { id, ...data }; // Spread the data and ID properties into a new object
        }) // Filter by subcategory
      })
    );
  }
getworkinghours(): Observable<WorkingModel> {
  const workingHoursDocRef = this.firestore.collection('workinghours').doc('kdPU4LjLRXb1T4otwHHB');

  return workingHoursDocRef.valueChanges().pipe(
    map(data => {
      return data as WorkingModel;
    })
  );
}

  
  
}
