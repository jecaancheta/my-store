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

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  createCategory() {
    let newCategory = {
      name: this.newCategory
    }

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

}
