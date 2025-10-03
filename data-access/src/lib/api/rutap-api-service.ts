import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class RutapApiService extends HttpHandler {
	entidades = () =>
		this.http.get(this.endpoints.rutap.entidades(this.getApi(this.api)))
}
