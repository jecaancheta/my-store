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
  searchTerm: String = '';
  categories: ICategory[] = [];
  products: IProduct[] = [];

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

  getProducts(categoryId: number, searchTerm: string) {
    let noSearchTerm = false;
    if (searchTerm === '') {
      noSearchTerm = true;
    }
    if (this.products != null && this.products.length > 0) {
      return this.products.filter(product => 
        product.categoryId === categoryId && (noSearchTerm || product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
      );
    }

    return null;
  }

  getFilteredProducts(name: string, id: number, searchTerm: string) {
    return this.isCategoryFilterPassed(name, searchTerm) ? this.getProducts(id, '') : this.getProducts(id, searchTerm);
  }

  isProductFilterPassed(id: number, searchTerm: string) {
    return this.getProducts(id, searchTerm).length > 0;
  }

  isCategoryFilterPassed(name: string, searchTerm: string) {
    if (searchTerm !== '') {
      return name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    }
    return true;
  }

  filterProducts(searchTerm: string) {
    return this.products.filter(product => product.name === searchTerm);
  }

  // 1. Check kung meron sa categories
  // 2. If true, display all products
  // 3. If none, filter all

  // 1. hasCategories || hasProducts
  // 
}
