import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[]= [];
  category: string;
  filterdProducts: Product[]=[];
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService){

    
    productsService.getAll().subscribe(products => {
      this.products = products;
      
      route.queryParamMap.subscribe(param => {
        this.category = param.get('category');
        this.applyFilter();
      });
    });


   }
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  applyFilter(){
    this.filterdProducts = (this.category)? this.products.filter(p => p.category === this.category) :
          this.products;
  }
}
