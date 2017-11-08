import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../shared/category.service';
import { ICategory } from './../../shared/category';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: ICategory[];
  newCategory: string;
  addMode: Boolean = false;
  sortByAsc: Boolean = true;
  sortBy: String = 'name';

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result.sort(this.sortByNameAsc);
    });
  }

  createCategory() {
    let newCategory = {
      name: this.newCategory
    };

    this.categoryService.createCategory(newCategory).subscribe(result => {
      this.newCategory = ' ';
      this.getCategories();
      this.toggleAddMode();
    });
  }

  updateCategory(category: ICategory) {
    this.categoryService.updateCategory(category).subscribe(result => {
    });
  }

  deleteCategory(id: number, index: number) {
    this.categoryService.deleteCategory(id).subscribe(result => {
      this.categories.splice(index, 1);
    });
  }

  toggleAddMode() {
    this.addMode = !this.addMode;
  }

  hasNoResult() {
    return !this.addMode && (this.categories == null || this.categories.length == 0);
  }

  toggleSort() {
    this.sortByAsc = !this.sortByAsc;
  }

  sort(sortBy: string) {
    this.sortBy = sortBy;
    this.toggleSort();


    if (this.sortBy === 'name') {
      if (this.sortByAsc) {
        this.categories.sort(this.sortByNameAsc);
      } else {
        this.categories.reverse();
        // this.categories.sort(this.sortByNameDesc);
      }
    }
  }

  isAscNotToggled(sortOrder: string) {
    return this.sortBy === sortOrder && !this.sortByAsc;
  }

  isDescNotToggled(sortOrder: string) {
    return this.sortBy === sortOrder && this.sortByAsc;
  }

  sortByNameAsc(category1: ICategory, category2: ICategory) {
    if (category1.name.toLowerCase() < category2.name.toLowerCase().toLowerCase()) {
      return -1;
    } else if (category1.name.toLowerCase() > category2.name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  }

  sortByNameDesc(category1: ICategory, category2: ICategory) {
    if (category1.name > category2.name) {
      return -1;
    } else if (category1.name === category2.name) {
      return 0;
    } else {
      return 1;
    }
  }
}
