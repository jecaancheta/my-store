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
    private requestOptions = new RequestOptions({ headers: this.headers });
    
    constructor(private http: Http) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get(this.productUrl)
            .map((response: Response) => <IProduct[]>response.json())
            .do(products => console.log('Products: ', products))
            .catch(this.handleError);
    }

    getProductsByCategory(categoryId: number): Observable<IProduct[]> {
        return this.getProducts()
            .map((products: IProduct[]) => products.filter(product => product.categoryId === categoryId));
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(product => product.id === id));
    }

    createProduct(product: IProduct) {
        return this.http.post(this.productUrl, JSON.stringify(product), this.requestOptions)
        .map((response: Response) => { 
            console.log(response);
        })
        .catch(this.handleError);
    }

    updateProduct(product: IProduct) {
        return this.http.put(this.productUrl, JSON.stringify(product), this.requestOptions)
        .map((response: Response) => { 
            console.log(response);
        })
        .catch(this.handleError);
    }

    deleteProduct(id: number) {
        return this.http.delete(this.productUrl + '/' + id)
        .map((response: Response) => { })
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
