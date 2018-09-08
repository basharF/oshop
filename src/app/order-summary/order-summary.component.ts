import { OrderService } from './../order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  order;
  orderId;
  items: any[]=[];
  subOrder: Subscription;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  async ngOnInit() {
    this.orderId = this.route.snapshot.queryParamMap.get('orderId');
    let order$ = await this.orderService.getOrderByOrderId(this.orderId);
    this.subOrder = order$.subscribe(order => {
      this.order = order;
    this.initItems();
    })
    
    
  }

  initItems(){
    for(let item in this.order.items)
    {
      this.items.push(this.order.items[item]);   
    }
  }

  getOrderTotalPrice(){
    let total=0;
    for(let item in this.items)
    {
      total += this.items[item].totalPrice;
    }
    return total;
  }

  ngOnDestroy(){
    this.subOrder.unsubscribe();
  }
}
