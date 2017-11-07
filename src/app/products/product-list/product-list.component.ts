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
  searchTerm: String;
  categories: ICategory[];
  products: IProduct[];

  constructor(private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.productService.getProducts().subscribe(products => {
        this.products = products;
      });
    });
  }

  getProducts(categoryId: number) {
    if (this.products != null && this.products.length > 0) {
      return this.products.filter(product => product.categoryId === categoryId);
    }

    return null;
  }

  filterCategories() {
    return this.categories.filter(category => category.name === this.searchTerm);
  }

  filterProducts() {
    return this.products.filter(product => product.name === this.searchTerm);
  }
}
