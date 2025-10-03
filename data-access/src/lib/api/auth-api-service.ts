import { Injectable } from '@angular/core'
import { HttpHandler } from './http-handler'

@Injectable({ providedIn: 'root' })
export class AuthApiService extends HttpHandler {
	health = () => this.http.get(this.endpoints.auth.health(this.getApi(this.api)))

	login = (form: object) =>
		this.http.post(this.endpoints.auth.login(this.getApi(this.api)), form)

	refresh = () => this.http.get(this.endpoints.auth.refresh(this.getApi(this.api)))

	logout = () =>
		this.http.post(this.endpoints.auth.logout(this.getApi(this.api)), null)
}
