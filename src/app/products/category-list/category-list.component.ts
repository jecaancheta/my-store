import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../shared/product.service';
import { CategoryService } from './../../shared/category.service';
import { ICategory } from './../../shared/category';
import { IProduct } from './../../shared/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  searchTerm: String = '';
  categories: ICategory[] = [];
  products: IProduct[] = [];

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];
    this.products = this.route.snapshot.data['products'];
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
}
