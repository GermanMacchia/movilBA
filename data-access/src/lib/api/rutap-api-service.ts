import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class RutapApiService extends HttpHandler {
	entidades = () =>
		this.http.get(this.endpoints.rutap.entidades(this.getApi(this.api)))

	vehiculos = (entidad_id: number) =>
		this.http.get(this.endpoints.rutap.vehiculos(this.getApi(this.api), entidad_id))

	lineas = (entidad_id: number) =>
		this.http.get(this.endpoints.rutap.lineas(this.getApi(this.api), entidad_id))
}
