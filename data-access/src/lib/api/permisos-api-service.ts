import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class PermisosApiService extends HttpHandler {
	usuarios = () =>
		this.http.get(this.endpoints.permisos.usuarios(this.getApi(this.api)))
	modulos = () =>
		this.http.get(this.endpoints.permisos.modulos(this.getApi(this.api)))
}
