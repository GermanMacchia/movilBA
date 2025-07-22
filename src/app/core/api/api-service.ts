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
            case 'rol1':
                return of({usuario: {nombre: 'rol1', rol: RolesUsuarios.ROL1}})
            case 'rol2':
                return of({usuario: {nombre: 'rol2', rol: RolesUsuarios.ROL2}})
            default:
                return of({usuario: {nombre: 'rol2', rol: RolesUsuarios.ROL2}})
        }
    }

    getData(rol: string) : Observable<{data:any}>{
        switch (rol) {
            case RolesUsuarios.ADMINISTRADOR:
                return of({data:data[RolesUsuarios.ADMINISTRADOR]})
            case RolesUsuarios.ROL1:
                return of({data:data[RolesUsuarios.ROL1]})
            case RolesUsuarios.ROL2:
                return of({data:data[RolesUsuarios.ROL2]})
            default:
                return of({data:data[RolesUsuarios.ROL2]})
        }
    }
}
