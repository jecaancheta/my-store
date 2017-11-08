import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from './../../shared/product';
import { ICategory } from './../../shared/category';
import { ProductService } from './../../shared/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from './../../shared/category.service';
import { ActivatedRoute } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
  providers: [ NgbDropdownConfig ]
})
export class AdminProductComponent implements OnInit {
  filteredProducts: IProduct[];
  products: IProduct[];
  categories: ICategory[];
  productInModal: IProduct;
  sortByAsc: Boolean = true;
  sortBy: String = 'name';
  previousSortBy: String = 'name';
  filterBy: String = 'none';
  hasCategoryUpdate: Boolean = false;
  categoryUpdateTitle: String = '';
  categoryUpdateMsg: String = '';
  alertClass: String = '';

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    config: NgbDropdownConfig) { 
      config.placement = 'bottom-right';      
    }

  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];
    this.products = this.route.snapshot.data['products'];
    this.arrangeProducts(this.sortBy.toString());
  }

  getProducts() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      this.arrangeProducts(this.sortBy.toString());
    });
  }

  arrangeProducts(sortBy: string) {
    this.filterByCategory(this.filterBy.toString());
    this.sortBy = sortBy;
    this.sort();
  }

  openProductModal(template: TemplateRef<any>, product: IProduct) {
    if (product == null) {
      this.productInModal = {
        name: '',
        id: null,
        categoryId: null,
        price: null,
        stocks: null,
        imageUrl: ''
      };
    } else {
      this.productInModal = product;
    }

    this.modalService.open(template).result.then((result) => {
      this.saveCategory();
    }, (reason) => {
      console.log('Save product modal is closed.')
    });
  }

  deleteProduct(id: number, index: number) {
    this.productService.deleteProduct(id).subscribe(result => {
      this.products.splice(index, 1);
      this.displayAlert('Deleted!', 'You have successfully deleted the product.', 'alert-danger');      
    });
  }

  getCategoryById(id: number): string {
    return this.categories.find(category => category.id === id).name;
  }

  saveCategory() {
    if (this.productInModal.id == null) {
      this.productService.createProduct(this.productInModal).subscribe(result => {
        this.getProducts();
        this.displayAlert('Added!', 'You have successfully added the product.', 'alert-success');
      });
    } else {
      this.productService.updateProduct(this.productInModal).subscribe(result => {
        this.arrangeProducts(this.sortBy.toString());
        this.displayAlert('Saved!', 'You have successfully updated the product.', 'alert-warning');                
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
    if (this.sortBy === this.previousSortBy) {
      this.sortByAsc = !this.sortByAsc;
    } else {
      this.sortByAsc = true;
    }
  }

  sort() {
    if (this.sortBy === 'name') {
      if (this.sortByAsc) {
        this.filteredProducts.sort(this.sortByNameAsc);
      } else {
        this.filteredProducts.sort(this.sortByNameDesc);
      }
    } else if (this.sortBy === 'category') {
      if (this.sortByAsc) {
        this.filteredProducts.sort(this.sortByCategoryAsc.bind(this));
      } else {
        this.filteredProducts.sort(this.sortByCategoryDesc.bind(this));
      }
    } else if (this.sortBy === 'price') {
      if (this.sortByAsc) {
        this.filteredProducts.sort(this.sortByPriceAsc);
      } else {
        this.filteredProducts.sort(this.sortByPriceDesc);
      }
    } else if (this.sortBy === 'stocks') {
      if (this.sortByAsc) {
        this.filteredProducts.sort(this.sortByStocksAsc);
      } else {
        this.filteredProducts.sort(this.sortByStocksDesc);
      }
    }
    this.previousSortBy = this.sortBy;
  }

  setSortBy(sortBy: string) {
    this.sortBy = sortBy;
  }

  isSortToggled(sortBy: string, sortByAsc: boolean) {
    return this.sortBy === sortBy && this.sortByAsc == sortByAsc;
  }

  sortByNameAsc(product1: IProduct, product2: IProduct) {
    return sortByStringAsc(product1.name, product2.name);
  }

  sortByNameDesc(product1: IProduct, product2: IProduct) {
    return sortByStringDesc(product1.name, product2.name);
  }

  sortByCategoryAsc(product1: IProduct, product2: IProduct) {
    const categoryName1 = this.categories.find(category => category.id === product1.categoryId).name;
    const categoryName2 = this.categories.find(category => category.id === product2.categoryId).name;
    return sortByStringAsc(categoryName1, categoryName2);
  }

  sortByCategoryDesc(product1: IProduct, product2: IProduct) {
    const categoryName1 = this.categories.find(category => category.id === product1.categoryId).name;
    const categoryName2 = this.categories.find(category => category.id === product2.categoryId).name;
    return sortByStringDesc(categoryName1, categoryName2);
  }

  sortByStocksDesc(product1: IProduct, product2: IProduct) {
    return sortByNumbersDesc(product1.stocks, product2.stocks);

  }

  sortByStocksAsc(product1: IProduct, product2: IProduct) {
    return sortByNumbersAsc(product1.stocks, product2.stocks);
  }

  sortByPriceDesc(product1: IProduct, product2: IProduct) {
    return sortByNumbersDesc(product1.price, product2.price);
  }

  sortByPriceAsc(product1: IProduct, product2: IProduct) {
    return sortByNumbersAsc(product1.price, product2.price);
  }

  displayAlert(title: string, message: string, alertClass: string) {
    this.categoryUpdateTitle = title;
    this.categoryUpdateMsg = message;
    this.hasCategoryUpdate = true;
    this.alertClass = alertClass;
    setTimeout(function() {
      this.hasCategoryUpdate = false;
    }.bind(this), 3000);
  }
}

function sortByStringAsc(string1, string2) {
  if (string1.toLowerCase() < string1.toLowerCase()) {
    return -1;
  } else if (string1.toLowerCase() > string2.toLowerCase()) {
    return 1;
  } else {
    return 0;
  }
}

function sortByStringDesc(string1, string2) {
  if (string1.toLowerCase() > string2.toLowerCase()) {
    return -1;
  } else if (string1.toLowerCase() === string2.toLowerCase()) {
    return 0;
  } else {
    return 1;
  }
}

function sortByNumbersDesc(number1, number2) {
  return number2 - number1;
}

function sortByNumbersAsc(number1, number2) {
  return number1 - number2;
}



