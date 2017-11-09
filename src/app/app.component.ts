import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { AdminAuthGuardService } from './admin-authguard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  username: string;
  password: string;
  isUserInvalid: Boolean = false;
  isCollapsed = true;

  constructor(private loginService: LoginService,
    private adminAuthGuardService: AdminAuthGuardService,
    private router: Router) { }

  isUserLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  loginUser() {
    this.loginService.loginUser(this.username, this.password).subscribe(result => {
      if (!result) {
        this.isUserInvalid = true;
      } else {
        this.router.navigate(['/categories']);
      }
    })
  }
}
