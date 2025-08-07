import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { RolesUsuarios } from '../interfaces/enums';
import { loginSuccess } from '../store';

export const ACCESS_VALUES = 'access_values';
export const DATA = 'data';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private router = inject(Router);
    private store$ = inject(Store);
    private ngxPermissionsService = inject(NgxPermissionsService);
    isPermissionGranted = signal<boolean>(false);

    constructor() {
        setTimeout(() => this.setDataOnReload(),0)
    }

    logout = () => {
        this.flushPermission();
        location.reload()
    };

    setAccessValues = (auth: any) => {
        this.ngxPermissionsService.addPermission(auth.usuario.rol);
        localStorage.setItem(ACCESS_VALUES, JSON.stringify(auth));
        this.isPermissionGranted.set(true);
        this.redirectByRol(auth.usuario.rol);
    };

    setDataOnReload = () => {
        const auth = localStorage.getItem(ACCESS_VALUES);
        const now = Math.floor(new Date().getTime() / 1000);

        if (!auth) return;

        const parsedAuth = JSON.parse(auth)

        if(parsedAuth.exp < now ) this.logout()

        this.isPermissionGranted.set(true);
        this.store$.dispatch(loginSuccess(parsedAuth))
        this.redirectByRol(parsedAuth.usuario.rol);
    };


    redirectByRol = (rol: string) => {
        switch (rol) {
            case RolesUsuarios.ADMINISTRADOR:
                this.router.navigate(['/modulos']);
                return;
            case RolesUsuarios.AUDITOR:
                this.router.navigate(['/modulos']);
                return;
            case RolesUsuarios.OPERADOR:
                this.router.navigate(['/opciones']);
                return;
            default:
                this.router.navigate(['/opciones']);
                return;
        }
    };

    flushPermission = () => {
        this.isPermissionGranted.set(false);
        this.ngxPermissionsService.flushPermissions();
        localStorage.removeItem(ACCESS_VALUES);
        localStorage.removeItem(DATA);
    };
}
