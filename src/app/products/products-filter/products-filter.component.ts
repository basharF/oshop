import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  tog: boolean = true;

  @Input('category') category;

  constructor(private categoriesService: CategoriesService) {
    this.categories$=categoriesService.getCategories();
   }
  
  ngOnInit() {
  }

  toggle(){
    this.tog = !this.tog;
  }

}
