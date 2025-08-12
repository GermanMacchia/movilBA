import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import mockData from '@utils/mockData.json';
import { MenuItem } from 'primeng/api';
import { of } from 'rxjs';
import { RolesUsuarios } from '../interfaces/enums';
import { AuthService } from '../services/auth-service';

export const modulosResolver: ResolveFn<MenuItem[]> = (_route, _state) => {
    const authService = inject(AuthService)
    const rol = authService.getData().usuario.rol

    if(!rol) throw new Error('Sin autorizacion')

    switch(rol){
        case RolesUsuarios.ADMINISTRADOR:
            return of(mockData.ADMINISTRADOR.modulos)
        case RolesUsuarios.AUDITOR:
            return of(mockData.AUDITOR.modulos)
        default:
            return of(mockData.OPERADOR.modulos)
    }
};
