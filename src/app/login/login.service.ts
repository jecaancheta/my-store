import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { IUser } from './user';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';




@Injectable()
export class LoginService {
  private loginStatus: boolean = false;

  private userUrl = "http://localhost:8090/users";
  
  constructor(private http: Http) { }
  
  getUserDetails(): Observable<IUser[]> {
    return this.http.get(this.userUrl)
          .map((response: Response) => <IUser[]>response.json())
          .catch(this.handleError);
  }
  
  private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  isLoggedIn() {
    return this.loginStatus;
  }

  setLoginStatus(value: boolean) {
    this.loginStatus = value;
  }
}
