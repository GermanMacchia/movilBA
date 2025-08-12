import {Injectable, inject} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {AuthService} from '@src/app/core/services/auth-service';
import {Observable} from 'rxjs';

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
