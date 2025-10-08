import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard {
    private authService = inject(AuthService);
    private router: Router = inject(Router);

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.authService.isPermissionGranted()) this.router.navigate([''])

        return true;
    }
}
