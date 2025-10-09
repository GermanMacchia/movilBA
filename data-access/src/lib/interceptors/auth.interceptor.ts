/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable, of, retry } from 'rxjs'

import { ENDPOINTS } from '../api/endpoints'
import { Session } from '../interfaces'
import { AuthService } from '../services/auth.service'
import { securityHeaders } from './security-headers'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private authService = inject(AuthService)

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authReq = this.setSecurityHeaders(req)
		const session = sessionStorage.getItem('session')

		if (authReq.url.includes('login') || !session) return next.handle(authReq)

		const { access_token, exp } = JSON.parse(session) as Session

		const now = new Date().getTime() / 1000

		if (
			access_token &&
			(exp - now) / 60 < 5 &&
			!req.url.includes(ENDPOINTS.auth.logout('')) &&
			!req.url.includes(ENDPOINTS.auth.refresh(''))
		)
			this.authService.refresh()

		if (access_token)
			authReq = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${access_token}`),
			})

		return next.handle(authReq).pipe(
			retry(2),
			catchError(error => {
				this.authService.resetpermissions()
				return of(error)
			}),
		)
	}

	private setSecurityHeaders(req: HttpRequest<any>): HttpRequest<any> {
		return req.clone({
			headers: req.headers
				.set(
					securityHeaders.xContentType.header,
					securityHeaders.xContentType.content,
				)
				.set(
					securityHeaders.strinctTransport.header,
					securityHeaders.strinctTransport.content,
				)
				.set(securityHeaders.xFrameOpt.header, securityHeaders.xFrameOpt.content)
				.set(
					securityHeaders.referrerPolicy.header,
					securityHeaders.referrerPolicy.content,
				)
				.set(
					securityHeaders.xPermCrossDomPol.header,
					securityHeaders.xPermCrossDomPol.content,
				)
				.set(
					securityHeaders.contentSecurity.header,
					securityHeaders.contentSecurity.content,
				),
		})
	}
}
