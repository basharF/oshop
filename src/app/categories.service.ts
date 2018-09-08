import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriesService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories',{
      query: {
        orderByChild: 'name'
      }
    });
  }
}
