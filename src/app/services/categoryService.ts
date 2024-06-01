import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CategoryModel } from '../model/categoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesCollection!: AngularFirestoreCollection<CategoryModel>;

  constructor(private afs: AngularFirestore) { }

  getCategories(): Observable<CategoryModel[]> {
    this.categoriesCollection = this.afs.collection<CategoryModel>('categorymaster');
    return this.categoriesCollection.snapshotChanges().pipe(
      map((actions: any[]) => actions.map((a: { payload: { doc: { data: () => CategoryModel; id: any; }; }; }) => {
        const data = a.payload.doc.data() as CategoryModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
}
