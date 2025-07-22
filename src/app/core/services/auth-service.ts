import {inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import * as dataEffects from '@src/app/core/store'
import * as loginEffects from '@src/app/core/store'
import {Store} from '@ngrx/store';

export const ACCESS_VALUES = 'access_values';
export const DATA = 'data';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private router = inject(Router);
    private store$ = inject(Store);
    isPermissionGranted = signal<boolean>(false);


    constructor() {
        this.setDataOnReload()
    }

    logout = () => {
        this.flushPermission();
        this.router.navigate(['login']);
    };

    setAccessValues = (auth: any) => {
        this.isPermissionGranted.set(true);
        localStorage.setItem(ACCESS_VALUES, JSON.stringify(auth));
        this.redirectByRol(auth.usuario.rol);
    };

    setData = (data: any) => {
        localStorage.setItem(DATA, JSON.stringify(data));
    }

    setDataOnReload = () => {
        const data = localStorage.getItem(DATA) ;
        const auth = localStorage.getItem(ACCESS_VALUES) ;

        if (!data || !auth) return

        this.setAccessValues(JSON.parse(auth))
        this.store$.dispatch(dataEffects.setData({data: JSON.parse(data)}))
        this.store$.dispatch(loginEffects.setUsuario({usuario: JSON.parse(auth).usuario}))
    }

    redirectByRol = (rol: string) => {
        switch (rol) {
            case 'ADMINISTRADOR':
                this.router.navigate(['modulos']);
                return;
            case 'ROL1':
                this.router.navigate(['modulos']);
                return;
            case 'ROL2':
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
        localStorage.removeItem(DATA);
    };
}
