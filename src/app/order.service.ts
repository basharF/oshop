import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthService } from './auth.service';

@Injectable()
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearAll();
    return result;
  }

  getOrders(){
    return this.db.list('/orders');
  }

  getOrdersByUserId(){
    return this.authService.user$.take(1).switchMap(user => {
      return this.db.list('/orders',{
        query: {
          orderByChild: 'userId',
          equalTo: user.uid
        }
      });
    });
    
  }

  getOrderByOrderId(id){
    return this.db.object('/orders/' + id);
  }

}
