import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  sortByAsc: Boolean = false;
  sortBy: String = 'name';
  hasCategoryUpdate: Boolean = false;
  categoryUpdateTitle: String = '';
  categoryUpdateMsg: String = '';
  alertClass: String = '';

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];
    this.sort('name');
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result.sort(this.sortByNameAsc);
      if (!this.sortByAsc) {
        this.categories.reverse();
      }
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
      this.displayAlert('Added!', 'You have successfully added the category.', 'alert-success');
    });
  }

  updateCategory(category: ICategory) {
    this.categoryService.updateCategory(category).subscribe(result => {
      this.displayAlert('Saved!', 'You have successfully updated the category.', 'alert-warning');
    });
  }

  deleteCategory(id: number, index: number) {
    this.categoryService.deleteCategory(id).subscribe(result => {
      this.categories.splice(index, 1);
      this.displayAlert('Deleted!', 'You have successfully deleted the category.', 'alert-danger');
    });
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

  toggleAddMode() {
    this.addMode = !this.addMode;
  }

  hasNoResult() {
    return !this.addMode && (this.categories == null || this.categories.length == 0);
  }

  sort(sortBy: string) {
    this.sortBy = sortBy;
    this.sortByAsc = !this.sortByAsc;
    
    if (this.sortBy === 'name') {
      if (this.sortByAsc) {
        this.categories.sort(this.sortByNameAsc);
      } else {
        this.categories.sort(this.sortByNameDesc);
      }
    }
  }

  isSortToggled(sortBy: string, sortByAsc: boolean) {
    return this.sortBy === sortBy && this.sortByAsc == sortByAsc;
  }

  sortByNameAsc(category1: ICategory, category2: ICategory) {
    return sortByStringAsc(category1.name, category2.name);
  }

  sortByNameDesc(category1: ICategory, category2: ICategory) {
    return sortByStringDesc(category1.name, category2.name);
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
