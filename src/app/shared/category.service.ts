import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICategory } from './category';

@Injectable()
export class CategoryService {
    private categoryUrl = 'http://localhost:8090/categories';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private requestOptions = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getCategories(): Observable<ICategory[]> {
        return this.http.get(this.categoryUrl)
            .map((response: Response) => <ICategory[]>response.json())
            .do(category => console.log('Categories: ', category))
            .catch(this.handleError);
    }

    getCategory(id: number): Observable<ICategory> {
        return this.getCategories()
            .map((categories: ICategory[]) => categories.find(category => category.id === id));
    }

    createCategory(category: any) {
        return this.http.post(this.categoryUrl, JSON.stringify(category), this.requestOptions)
            .map((response: Response) => { 
                console.log(response);
            })
            .catch(this.handleError);
    }

    updateCategory(category: ICategory) {
        return this.http.put(this.categoryUrl, JSON.stringify(category), this.requestOptions)
            .map((response: Response) => { console.log(response); })
            .catch(this.handleError);
    }

    deleteCategory(id: number) {
        return this.http.delete(this.categoryUrl + '/' + id)
            .map((response: Response) => { })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
