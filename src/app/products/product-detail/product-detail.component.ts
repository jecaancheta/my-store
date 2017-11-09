import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/product';
import { CategoryService } from '../../shared/category.service';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit() {
    let categoryId = this.route.snapshot.params['categoryId'];
    let productId = this.route.snapshot.params['productId'];
    if (categoryId != null) {
      this.productService.getProductsByCategory(+categoryId).subscribe(results => {
        this.products = results;
      });
    } else {
      this.productService.getProduct(+productId).subscribe(result => {
        this.products.push(result);
      });
    }
  }
}
