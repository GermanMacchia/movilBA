import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import data from '@utils/mockData.json';
import { ENDPOINTS } from '@api/endpoints';
import { RolesUsuarios } from '@enums';
import { AppConfigService } from '@src/app/core/config/app-config.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private endpoints = ENDPOINTS;
    private http = inject(HttpClient);
    private config = inject(AppConfigService);

    getApiUrl = () => this.config.getConfigByKey('apiUrl');

    login = (email: string, clave: string) => {
        switch (email) {
            case 'admin':
                return of({
                    usuario: {
                        nombre: 'Admin',
                        rol: RolesUsuarios.ADMINISTRADOR,
                    },
                });
            case 'audit':
                return of({
                    usuario: { nombre: 'Auditor', rol: RolesUsuarios.AUDITOR },
                });
            case 'opera':
                return of({
                    usuario: {
                        nombre: 'Operador',
                        rol: RolesUsuarios.OPERADOR,
                    },
                });
            default:
                return of({
                    usuario: {
                        nombre: 'Operador',
                        rol: RolesUsuarios.OPERADOR,
                    },
                });
        }
    };

    getData(rol: string): Observable<{ data: any }> {
        switch (rol) {
            case RolesUsuarios.ADMINISTRADOR:
                return of({ data: data[RolesUsuarios.ADMINISTRADOR] });
            case RolesUsuarios.AUDITOR:
                return of({ data: data[RolesUsuarios.AUDITOR] });
            case RolesUsuarios.OPERADOR:
                return of({ data: data[RolesUsuarios.OPERADOR] });
            default:
                return of({ data: data[RolesUsuarios.OPERADOR] });
        }
    }
}
