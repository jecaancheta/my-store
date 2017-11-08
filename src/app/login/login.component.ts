import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AdminAuthGuardService } from '../admin-authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: IUser[] = [];
  errorMessage: string = '';
  isUsernameFound: boolean;

  constructor(private loginService: LoginService, private adminAuthGuardService: AdminAuthGuardService, 
              private router: Router) { }

  ngOnInit() { }

  authenticateUser(username: string, password: string): void {
    console.log("Username: " + username + ", Password: " + password);
    this.isUsernameFound = false;
    this.loginService.getUserDetails()
                .subscribe(
                      userData => {
                        console.log('Went to getUSerDetails()');
                        this.userData = userData;
                        for(let i=0;i<userData.length;i++) {
                            var data = userData[i]
                            if(username === data.username && password === data.password){
                                console.log('User valid');
                                this.isUsernameFound = true;
                                if(data.isAdmin) {
                                  console.log('User is admin');
                                  this.adminAuthGuardService.setAdminUserState(true);
                                  this.router.navigate(['/admin/product']);
                                } else {
                                  console.log('User is NOT admin')
                                  this.adminAuthGuardService.setAdminUserState(false);
                                  this.router.navigate(['/product']);
                                }
                                console.log('Admin User State: ' + this.adminAuthGuardService.getAdminUserState());
                                console.log('Login Status: ' + this.loginService.isLoggedIn())
                                this.loginService.setLoginStatus(true);
                                console.log('Login Status: ' + this.loginService.isLoggedIn())
                                break;
                            } else {
                              console.log('User invalid');
                            }
                        }
                      },
                      error => this.errorMessage = <any>error);
  }


}
