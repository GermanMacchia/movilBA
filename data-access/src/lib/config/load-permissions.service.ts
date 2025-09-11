/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { RolesUsuarios } from '../interfaces/enums';
// import { ACCESS_VALUES } from '../services/auth-service';

@Injectable({ providedIn: 'root' })
export class LoadPermissionsService {
    public loadPermissions() {
        // const stored = sessionStorage.getItem(ACCESS_VALUES);
        // const permisos = stored
        //     ? JSON.parse(stored)
        //     : { usuario: { rol: RolesUsuarios.OPERADOR } };

        const permisos =  { usuario: { rol: RolesUsuarios.OPERADOR } };
        return new Promise((res) => res(permisos.usuario.rol));
    }
}

export function initializePermissions() {
    const loadPermissionsService = inject(LoadPermissionsService);
    const ngxPermissionsService = inject(NgxPermissionsService);

    return loadPermissionsService.loadPermissions().then((permissions: any) => {
        return ngxPermissionsService.addPermission(permissions);
    });
}
