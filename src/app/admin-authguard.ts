import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AdminAuthGuardService } from "./admin-authguard.service";

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private adminAuthGuardService: AdminAuthGuardService) {}

    canActivate() {
        return this.adminAuthGuardService.getAdminUserState();
    }

}