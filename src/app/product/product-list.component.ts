import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private _productService: ProductService,
              private _router: Router) {
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this._productService.getProducts()
      .subscribe(products => this.products = products);
  }

  addProduct(): void {
    this._router.navigate(['/productDetail', -1]);
  }

  deleteProduct(id: number): void {
    if (confirm("Delete this product?")) {
      this._productService.deleteProduct(id)
        .subscribe(() => this.products = this.products.filter(p => p.productId != id));
    }
  }
}
