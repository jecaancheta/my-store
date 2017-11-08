import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuardService {
    private isUserAdmin: boolean;

    setAdminUserState(value: boolean): void {
        this.isUserAdmin = value;
    }

    getAdminUserState(): boolean {
        return this.isUserAdmin;
    }
}
