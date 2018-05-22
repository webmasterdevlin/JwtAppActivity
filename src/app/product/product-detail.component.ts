import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from "./product.service";
import { Product } from './product';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  originalProduct: Product;
  categories: Category[];

  constructor(private _categoryService: CategoryService,
              private _productService: ProductService,
              private _route: ActivatedRoute,
              private _location: Location) {}

  ngOnInit() {
    this.getCategories();
    // Get the passed in product id
    let id = +this._route.snapshot.paramMap.get('id');
    // Create or load a product
    this.createOrLoadProduct(id);
  }

  private createOrLoadProduct(id: number) {
    if (id == -1) {
      // Create new product object
      this.initProduct();
    }
    else {
      // Get a product from product service
      this._productService.getProduct(id)
        .subscribe(product => {
          this.product = product;
          this.originalProduct = Object.assign({}, this.product)
        });
    }
  }

  private initProduct(): void {
    // Add a new product
    this.product = new Product({
      introductionDate: new Date(),
      price: 1,
      url: "www.fairwaytech.com"
    });
    this.originalProduct = Object.assign({}, this.product);
  }

  private getCategories(): void {
    this._categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  saveData(): void {
    if (this.product.productId) {
      // Update product
      this._productService.updateProduct(this.product)
        .subscribe(product => { this.product = product },
          () => null,
          () => this.dataSaved());
    }
    else {
      // Add a product
      this._productService.addProduct(this.product)
        .subscribe(product => { this.product = product },
          () => null,
          () => this.dataSaved());
    }
  }

  private dataSaved(): void {
    // Redirect back to list
    this.goBack();
  }

  goBack(): void {
    this._location.back();
  }

  cancel(): void {
    this.goBack();
  }
}
