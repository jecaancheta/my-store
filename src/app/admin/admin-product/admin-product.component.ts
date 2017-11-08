import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from './../../shared/product';
import { ICategory } from './../../shared/category';
import { ProductService } from './../../shared/product.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CategoryService } from './../../shared/category.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  filteredProducts: IProduct[];
  products: IProduct[];
  categories: ICategory[];
  modalRef: BsModalRef;
  newProduct: IProduct;
  sortByAsc: Boolean = true;
  sortBy: String = 'name';
  previousSortBy: String = 'name';
  filterBy: String = '';

  constructor(private productService: ProductService, private categoryService: CategoryService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      this.filteredProducts = this.products;
    });
  }

  openProductModal(template: TemplateRef<any>, product: IProduct) {
    if (product == null) {
      this.newProduct = {
        name: '',
        id: null,
        categoryId: null,
        price: null,
        stocks: null,
        imageUrl: ''
      };
    } else {
      this.newProduct = product;
    }

    this.modalRef = this.modalService.show(template);
  }

  deleteProduct(id: number, index: number) {
    this.productService.deleteProduct(id).subscribe(result => {
      this.products.splice(index, 1);
    });
  }

  getCategoryById(id: number): string {
    return this.categories.find(category => category.id === id).name;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  saveCategory() {
    if (this.newProduct.id == null) {
      this.productService.createProduct(this.newProduct).subscribe(result => {
        this.modalRef.hide();
        this.getProducts();
      });
    } else {
      this.productService.updateProduct(this.newProduct).subscribe(result => {
        this.modalRef.hide();
      });
    }
  }

  filterByCategory(filterBy: string) {
    this.filterBy = filterBy;
    if (this.filterBy === 'none') {
      return this.filteredProducts = this.products;      
    } else {
      this.filteredProducts = this.products.filter(product => {
        const category: ICategory = this.categories.find(category => category.id === product.categoryId);
        return category.name === this.filterBy;
      });
    }
  }

  toggleSort() {
    this.sortByAsc = !this.sortByAsc;
  }

  sort(sortBy: string) {
    this.sortBy = sortBy;
    if (this.sortBy === this.previousSortBy) {
      this.toggleSort();
    } else {
      this.sortByAsc = true;
    }

    if (this.sortBy === 'name') {
      if (this.sortByAsc) {
        this.filteredProducts = this.products.sort(this.sortByNameAsc);
      } else {
        this.filteredProducts = this.products.sort(this.sortByNameDesc);
      }
    } else if (this.sortBy === 'category') {
      if (this.sortByAsc) {
        this.filteredProducts = this.products.sort(this.sortByCategoryAsc.bind(this));
      } else {
        this.filteredProducts = this.products.sort(this.sortByCategoryDesc.bind(this));
      }
    } else if (this.sortBy === 'price') {
      if (this.sortByAsc) {
        this.filteredProducts = this.products.sort(this.sortByPriceAsc);
      } else {
        this.filteredProducts = this.products.sort(this.sortByPriceDesc);
      }
    } else if (this.sortBy === 'stocks') {
      if (this.sortByAsc) {
        this.filteredProducts = this.products.sort(this.sortByStocksAsc);
      } else {
        this.filteredProducts = this.products.sort(this.sortByStocksDesc);
      }
    }
    this.previousSortBy = this.sortBy;
  }

  setSortBy(sortBy: string) {
    this.sortBy = sortBy;
  }

  isAscNotToggled(sortOrder: string) {
    return this.sortBy === sortOrder && !this.sortByAsc;
  }

  isDescNotToggled(sortOrder: string) {
    return this.sortBy === sortOrder && this.sortByAsc;
  }

  sortByNameAsc(product1: IProduct, product2: IProduct) {
    if (product1.name > product2.name) {
      return 1;
    } else if (product1.name === product2.name ) {
      return 0;
    } else {
      return -1;
    }
  }

  sortByNameDesc(product1: IProduct, product2: IProduct) {
    if (product1.name > product2.name) {
      return -1;
    } else if (product1.name === product2.name ) {
      return 0;
    } else {
      return 1;
    }
  }

  sortByCategoryAsc(product1: IProduct, product2: IProduct) {
    const categoryName1 = this.categories.find(category => category.id === product1.categoryId).name;
    const categoryName2 = this.categories.find(category => category.id === product2.categoryId).name;

    if (categoryName1 > categoryName2) {
      return 1;
    } else if (categoryName1 === categoryName2 ) {
      return 0;
    } else {
      return -1;
    }
  }

  sortByCategoryDesc(product1: IProduct, product2: IProduct) {
    const categoryName1 = this.categories.find(category => category.id === product1.categoryId).name;
    const categoryName2 = this.categories.find(category => category.id === product2.categoryId).name;

    if (categoryName1 > categoryName2) {
      return -1;
    } else if (categoryName1 === categoryName2 ) {
      return 0;
    } else {
      return 1;
    }
  }

  sortByStocksDesc(product1: IProduct, product2: IProduct) {
    return product2.stocks - product1.stocks;
  }

  sortByStocksAsc(product1: IProduct, product2: IProduct) {
    return product1.stocks - product2.stocks;
  }

  sortByPriceDesc(product1: IProduct, product2: IProduct) {
    return product2.price - product1.price;
  }

  sortByPriceAsc(product1: IProduct, product2: IProduct) {
    return product1.price - product2.price;
  }

  hasNoResult() {
    return this.filteredProducts == null || this.filteredProducts.length == 0;
  }
}


