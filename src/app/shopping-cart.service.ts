import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { promise } from '../../node_modules/protractor';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/map';
import { Observable } from '../../node_modules/rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/'+ cartId)
            .map(x => new ShoppingCart(x.items));
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId= localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$= this.db.object('/shopping-carts/'+ cartId +'/items/' + product.$key);
    item$.take(1).subscribe(item => {
      item$.update({
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: (item.quantity || 0 ) +1 
      });
    });
  }

  async increase(productId: string){
    let cartId = await this. getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    item$.take(1).subscribe(item => {
      item$.update({quantity: item.quantity + 1});
    });
  }

  async decrease(productId: string){
    let cartId = await this. getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    item$.take(1).subscribe(item => {
      if(item.quantity===1) item$.remove();
      else item$.update({quantity: item.quantity - 1});
    });
  }

  async clearAll(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
}
