import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@interfaces';

export const ACCESS_VALUES = 'access_values';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private router = inject(Router);
    isPermissionGranted = signal<boolean>(false);

    logout = () => {
        this.flushPermission();
        this.router.navigate(['login']);
    };

    setAccessValues = (auth: any) => {
        this.isPermissionGranted.set(true);
        localStorage.setItem(ACCESS_VALUES, JSON.stringify(auth));
        this.redirectByRol(auth.usuario.rol);
    };

    redirectByRol = (rol: string) => {
        switch (rol) {
            case 'ADMINISTRADOR':
                this.router.navigate(['modulos']);
                return;
            default:
                this.router.navigate(['/opciones']);
                return;
        }
    };

    flushPermission = () => {
        this.isPermissionGranted.set(false);
        localStorage.removeItem(ACCESS_VALUES);
    };
}
