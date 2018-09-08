import { Product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../products.service';
import { CategoriesService } from './../../categories.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product= {
    $key: null,
    title: null,
    price: null,
    category:null,
    imageUrl: null
  };
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private productsService: ProductsService) {

    this.categories$= categoriesService.getCategories();
    this.id= route.snapshot.paramMap.get('id');
    if(this.id) productsService.get(this.id).take(1).subscribe(p => this.product=p);
   }

   save(product){
     if(this.id) this.productsService.update(this.id,product);
     else this.productsService.create(product);
          
     this.router.navigate(['/admin/products']);
   }

   delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;
    
    this.productsService.delete(this.id);
    this.router.navigate(['/admin/products']);
   }

  ngOnInit() {
  }

}