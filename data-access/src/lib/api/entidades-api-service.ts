import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class EntidadesApiService extends HttpHandler {
	api = 'apiCore'

	entidades = () => 
		this.http.get(this.endpoints.entidades.entidades(this.getApi(this.api)))
}
