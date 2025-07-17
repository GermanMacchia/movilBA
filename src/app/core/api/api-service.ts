import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '@api/endpoints';
import {AppConfigService} from '@src/app/core/config/app-config.service';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private endpoints = ENDPOINTS
    private http = inject(HttpClient)
    private config = inject(AppConfigService)

    getApiUrl = () => this.config.getConfigByKey('apiUrl')

    login = (email: string, clave: string) => {
        switch (email) {
            case 'admin':
                return of({usuario: {nombre: 'Administrador', rol: 'ADMINISTRADOR'}})
            default:
                return of({usuario: {nombre: 'Visitante', rol: 'VISITANTE'}})
        }
    }
}
