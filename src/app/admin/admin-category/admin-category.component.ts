import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../shared/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  newCategory: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {

  }

  createCategory() {
    this.categoryService.createCategory(this.newCategory).subscribe(result => {
      this.newCategory = ' ';
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id);.subscribe(result => {
      this.newCategory = '';
    });
  }

}
