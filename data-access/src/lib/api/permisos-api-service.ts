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

	deletePermiso = (id: number) =>
		this.http.delete(
			this.endpoints.permisos.permisos(this.getApi(this.api)) + `/${id}`,
		)

	createUsuario = ({ nombre, email, cuil, clave }: any) =>
		this.http.post(this.endpoints.permisos.usuarios(this.getApi(this.api)), {
			nombre,
			email,
			cuil,
			password: clave,
		})

	updateUsuario = ({ id, nombre, email, cuil }: any) =>
		this.http.put(
			this.endpoints.permisos.usuarios(this.getApi(this.api)) + `/${id}`,
			{
				nombre,
				email,
				cuil,
			},
		)

	deleteUsuario = (id: number) =>
		this.http.delete(
			this.endpoints.permisos.usuarios(this.getApi(this.api)) + `/${id}`,
		)
}
