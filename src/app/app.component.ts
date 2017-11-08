import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isCollapsed = true;

  constructor(private loginService: LoginService) {}

  isUserLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
