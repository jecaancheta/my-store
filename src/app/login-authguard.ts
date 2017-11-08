import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";
import { CanActivate } from "@angular/router";

@Injectable()
export class LoginAuthGuard implements CanActivate {

    constructor(private loginService: LoginService) {}

    canActivate() {
        return !this.loginService.isLoggedIn();
    }

}