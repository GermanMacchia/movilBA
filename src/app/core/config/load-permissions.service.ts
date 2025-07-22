/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core';
import { RolesUsuarios } from '@enums';
import { ACCESS_VALUES } from '@src/app/core/services/auth-service';
import { NgxPermissionsService } from 'ngx-permissions';

export class LoadPermissionsService {
    public loadPermissions() {
        if (!sessionStorage.getItem(ACCESS_VALUES))
            return new Promise((res) => res([RolesUsuarios.OPERADOR]));

        const access_values = JSON.parse(
            sessionStorage.getItem(ACCESS_VALUES) as string
        );

        return new Promise((res) => res([access_values.rol]));
    }
}

export function initializePermissions() {
    const loadPermissionsService = inject(LoadPermissionsService);
    const ngxPermissionsService = inject(NgxPermissionsService);

    return loadPermissionsService.loadPermissions().then((permissions: any) => {
        return ngxPermissionsService.loadPermissions(permissions);
    });
}
