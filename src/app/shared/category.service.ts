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

    createCategory(name: string) {
        let options = new RequestOptions({ headers: this.headers });

        let result = this.http.post(this.categoryUrl, JSON.stringify(name), options);
        return result.map((response: Response) => {
            let returnedData = response.json();
            return returnedData;
        }).catch(this.handleError);
    }

    updateCategory(category: any) {
        let options = new RequestOptions({ headers: this.headers });

        let result = this.http.put(this.categoryUrl + '/' + category.id, JSON.stringify(category), options);
        return result.map((response: Response) => {
            let returnedData = response.json();
            return returnedData;
        }).catch(this.handleError);
    }

    deleteCategory(category: any) {
        let result = this.http.delete(this.categoryUrl + '/' + category.id);
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
