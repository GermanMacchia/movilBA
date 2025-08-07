import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINTS } from '@api/endpoints';
import { RolesUsuarios } from '@enums';
import { AppConfigService } from '@src/app/core/config/app-config.service';
import data from '@utils/mockData.json';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private endpoints = ENDPOINTS;
    private http = inject(HttpClient);
    private config = inject(AppConfigService);

    getApiUrl = () => this.config.getConfigByKey('apiUrl');

    login = (cuit: string, clave: string) => {
        const now = new Date();
        const iat = Math.floor(now.getTime() / 1000); // Tiempo actual en segundos
        const exp = iat + 300; // Expira en 5 minutos (600 segundos)

        switch (cuit) {
            case 'admin':
                return of({
                    usuario: {
                        nombre: 'Admin',
                        rol: RolesUsuarios.ADMINISTRADOR,
                    },
                    iat,
                    exp
                });
            case 'audit':
                return of({
                    usuario: {
                        nombre: 'Auditor',
                        rol: RolesUsuarios.AUDITOR
                    },
                    iat,
                    exp
                });
            case 'opera':
                return of({
                    usuario: {
                        nombre: 'Operador',
                        rol: RolesUsuarios.OPERADOR,
                    },
                    iat,
                    exp
                });
            default:
                return of({
                    usuario: {
                        nombre: 'Operador',
                        rol: RolesUsuarios.OPERADOR,
                    },
                    iat,
                    exp
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
