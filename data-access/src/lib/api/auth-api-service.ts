import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class AuthApiService extends HttpHandler {
		api = 'apiAuth'

	health = () => 
		this.http.get(this.endpoints.auth.cfrToken(this.getApi(this.api)))

	// permissions = () =>
	// 	this.http.get(this.endpoints.auth.persmissions(this.getApiUrl()))

	csrf = () => this.http.get(this.endpoints.auth.cfrToken(this.getApi(this.api)))

	login = (form: object) =>
		this.http.post(this.endpoints.auth.login(this.getApi(this.api)), form)

	logout = () =>
		this.http.post(this.endpoints.auth.logout(this.getApi(this.api)), null)

	getSession = () => 
		this.http.get(this.endpoints.auth.session(this.getApi(this.api)))
}
