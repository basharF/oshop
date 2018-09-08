import { Product } from './../../models/product';
import { ProductsService } from './../../products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';
import { DataTableResource } from '../../../../node_modules/angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterdProducts: any[];
  subscribtion: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[]= [];
  itemCount: number;

  constructor(private productsService: ProductsService) {
     this.subscribtion= productsService.getAll().subscribe(products => {
      this.products = this.filterdProducts = products;
      this.initializeTable(products);
     });
   }

  ngOnInit() {
  }

  private initializeTable(products: Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0})
        .then(items => this.items= items);
    this.tableResource.count()
        .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params)
        .then(items => this.items= items);
  }

  filter(query){
    this.filterdProducts = (query)?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

      this.initializeTable(this.filterdProducts);
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
}
