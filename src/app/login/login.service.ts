import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { IUser } from './user';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class LoginService {
  private currentUser: IUser;

  private userUrl = "http://localhost:8090/users";
  
  constructor(private http: Http) { }
  
  loginUser(username: string, password: string): Observable<IUser[]> {
    return this.http.get(this.userUrl)
          .map((response: Response) => <IUser[]>response.json())
          .do(res => {
            let user = res.find(user => user.username === username && user.password === password);
            if (user != null) {
              this.currentUser = user;
            } else {
              return false;
            }
          })
          .catch(this.handleError);
  }
  
  private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  isLoggedIn() {
    return this.currentUser != null;
  }
}
