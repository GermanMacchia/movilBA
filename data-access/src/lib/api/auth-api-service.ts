import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class AuthApiService extends HttpHandler {
	api = 'apiUrl'

	health = () => this.http.get(this.endpoints.auth.health(this.getApi(this.api)))

	login = (form: object) =>
		this.http.post(this.endpoints.auth.login(this.getApi(this.api)), form)

	logout = () =>
		this.http.post(this.endpoints.auth.logout(this.getApi(this.api)), null)
}
