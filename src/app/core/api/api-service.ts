import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '@api/endpoints';
import {AppConfigService} from '@src/app/core/config/app-config.service';
import {Observable, of} from 'rxjs';
import {RolesUsuarios} from '@enums';
import data from '@api/data.json';

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
                return of({usuario: {nombre: 'Admin', rol: RolesUsuarios.ADMINISTRADOR}})
            default:
                return of({usuario: {nombre: 'Visitante', rol: RolesUsuarios.VISITANTE}})
        }
    }

    getData(rol: string) : Observable<{data:any}>{
        switch (rol) {
            case RolesUsuarios.ADMINISTRADOR:
                return of({data:data[RolesUsuarios.ADMINISTRADOR]})
            default:
                return of({data:data[RolesUsuarios.VISITANTE]})
        }
    }
}
