import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private productUrl = 'http://localhost:8090/products';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    
    constructor(private http: Http) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get(this.productUrl)
            .map((response: Response) => <IProduct[]>response.json())
            .do(products => console.log('Products: ', products))
            .catch(this.handleError);
    }

    getProductsByCategory(categoryId: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(product => product.categoryId === categoryId));
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(product => product.id === id));
    }

    createProduct(name: string) {
        let options = new RequestOptions({ headers: this.headers });

        let result = this.http.post(this.productUrl, JSON.stringify(name), options);
        return result.map((response: Response) => {
            let returnedData = response.json();
            return returnedData;
        }).catch(this.handleError);
    }

    updateProduct(category: any) {
        let options = new RequestOptions({ headers: this.headers });

        let result = this.http.put(this.productUrl + '/' + category.id, JSON.stringify(category), options);
        return result.map((response: Response) => {
            let returnedData = response.json();
            return returnedData;
        }).catch(this.handleError);
    }

    deleteProduct(category: any) {
        let result = this.http.delete(this.productUrl + '/' + category.id);
        return result.map((response: Response) => {
            let returnedData = response.json();
            return returnedData;
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
