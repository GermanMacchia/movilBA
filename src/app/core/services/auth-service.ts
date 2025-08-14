import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RolesUsuarios } from '@enums';
import { Store } from '@ngrx/store';
import * as dataEffects from '@src/app/core/store';
import * as loginEffects from '@src/app/core/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Auth } from '../interfaces/interfaces';

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
        this.setDataOnReload();
    }

    logout = () => {
        this.flushPermission();
        this.router.navigate(['login']);
    };

    setAccessValues = (auth: any) => {
        this.ngxPermissionsService.addPermission(auth.usuario.rol);
        this.isPermissionGranted.set(true);
        sessionStorage.setItem(ACCESS_VALUES, JSON.stringify(auth));
        this.redirectByRol(auth.usuario.rol);
    };

    setData = (data: any) => {
        sessionStorage.setItem(DATA, JSON.stringify(data));
    };

    getData = (): Auth => JSON.parse(sessionStorage.getItem(ACCESS_VALUES)!)

    setDataOnReload = () => {
        const data = sessionStorage.getItem(DATA);
        const auth = sessionStorage.getItem(ACCESS_VALUES);

        if (!data || !auth) return;

        this.setAccessValues(JSON.parse(auth));
        this.store$.dispatch(dataEffects.setData({ data: JSON.parse(data) }));
        this.store$.dispatch(
            loginEffects.setUsuario({ usuario: JSON.parse(auth).usuario })
        );
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
        sessionStorage.removeItem(ACCESS_VALUES);
        sessionStorage.removeItem(DATA);
    };
}
