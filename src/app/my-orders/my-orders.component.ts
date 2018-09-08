import { async } from '@angular/core/testing';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '../../../node_modules/@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[]= [];
  user;

  constructor(
    private datePipe: DatePipe,
    private orderService: OrderService,
    private authService: AuthService) { }

  async ngOnInit() {
    let orders$ = await this.orderService.getOrdersByUserId();
    this.authService.user$.subscribe(user => this.user = user);
    orders$.subscribe(orders => this.orders = orders);
  }

  getOrderDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
