import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  categories: Category[];

  constructor(private _categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  private getCategories(): void {
    this._categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}
