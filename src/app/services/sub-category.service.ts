import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SubCategory } from '../model/subCategoryModel';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private categoriesCollection!: AngularFirestoreCollection<SubCategory>;

  constructor(private afs: AngularFirestore) { }

  getSubCategories(): Observable<SubCategory[]> {
    this.categoriesCollection = this.afs.collection<SubCategory>('sub_category_master',  ref => ref.orderBy('sub_index', 'asc'));
    return this.categoriesCollection.snapshotChanges().pipe(
      map((actions: any[]) => actions.map((a: { payload: { doc: { data: () => SubCategory; id: any; }; }; }) => {
        const data = a.payload.doc.data() as SubCategory;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getSubcategoriesByCategory(category: string):Observable<SubCategory[]> {
    this.categoriesCollection = this.afs.collection<SubCategory>('sub_category_master', ref => ref.orderBy('sub_index', 'asc') );
    return this.categoriesCollection.snapshotChanges().pipe(
      map((actions: any[]) => actions.map((a: { payload: { doc: { data: () => SubCategory; id: any; }; }; }) => {
        const data = a.payload.doc.data() as SubCategory;
        const id = a.payload.doc.id;
        return { id, ...data };
      }).filter(product => product.category === category)
      
      )
    );
  }
  
}
