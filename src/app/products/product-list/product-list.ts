import { ICategory } from './../../shared/category';
import { IProduct } from './../../shared/product';

export class ProductList {
    category: ICategory;
    products: IProduct[];

    constructor(category: ICategory, products: IProduct[]) {
        this.category = category;
        this.products = products;
    }
}
