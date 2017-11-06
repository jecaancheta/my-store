import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../shared/product.service';
import { CategoryService } from './../../shared/category.service';
import { ProductList } from './product-list';
import { ICategory } from './../../shared/category';
import { IProduct } from './../../shared/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private productList: ProductList[];

  constructor(private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit() {
    // TODO 
    // this.categoryService.getCategories().subscribe(categories => {
    //   this.productService.getProducts().subscribe(products => {
    //     categories.forEach(category => {
    //       let filteredProducts = products.filter(product => product.categoryId == category.id);
    //       let item = new ProductList(category, filteredProducts);
    //       this.productList.push(item);
    //     });
    //     console.log("productlist: ", this.productList);
    //   });
    // });
  }
}
