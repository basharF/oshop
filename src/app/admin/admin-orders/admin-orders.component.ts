import { ProductsFilterComponent } from './../../products/products-filter/products-filter.component';
import { Observable } from 'rxjs/Observable';
import { OrderService } from './../../order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders: any;
  users: any[]= [];
  orderSub: Subscription;
  userSub: Subscription;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private datePipe: DatePipe) { }


  async ngOnInit() {
    let orders$ = await this.orderService.getOrders();
    let users$ = await this.userService.getAll();
    this.orderSub = orders$.subscribe(orders => this.orders = orders);

    this.userSub = users$.subscribe(usersMap => {
      for(let userId in usersMap)
      {
        this.users.push({
          name: usersMap[userId].name,
          email: usersMap[userId].email,
          isAdmin: usersMap[userId].isAdmin,
          id: usersMap[userId].$key
        });
      }
    });
  }

  getOrderDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getUserName(id): string{
    let user = this.users.find(i => i.id === id);
    return user? user.name : "Unknown";
  }

  getUserEmail(id){
    let user = this.users.find(i => i.id === id);
    return user? user.email : "Unknown";
  }

  ngOnDestroy(){
    this.orderSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
