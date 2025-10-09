import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class PermisosApiService extends HttpHandler {
	usuarios = () =>
		this.http.get(this.endpoints.permisos.usuarios(this.getApi(this.api)))
	modulos = () =>
		this.http.get(this.endpoints.permisos.modulos(this.getApi(this.api)))

	createPermiso = ({ usuario_id, modulo_id, permisos }: any) =>
		this.http.post(this.endpoints.permisos.permisos(this.getApi(this.api)), {
			usuario_id,
			modulo_id,
			permisos,
		})

	createUsuario = ({ nombre, email, cuil, clave }: any) =>
		this.http.post(this.endpoints.permisos.usuarios(this.getApi(this.api)), {
			nombre,
			email,
			cuil,
			password: clave,
		})
}
