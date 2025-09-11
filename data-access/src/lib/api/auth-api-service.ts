import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class AuthApiService extends HttpHandler {
	health = () => this.http.get(this.endpoints.auth.cfrToken(this.getApiUrl()))

	// permissions = () =>
	// 	this.http.get(this.endpoints.auth.persmissions(this.getApiUrl()))

	csrf = () => this.http.get(this.endpoints.auth.cfrToken(this.getApiUrl()))

	login = (form: object) =>
		this.http.post(this.endpoints.auth.login(this.getApiUrl()), form)

	logout = () =>
		this.http.post(this.endpoints.auth.logout(this.getApiUrl()), null)

	getSession = () => this.http.get(this.endpoints.auth.session(this.getApiUrl()))
}
