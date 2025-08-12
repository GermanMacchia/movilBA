/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import {inject, Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {securityHeaders} from './security-headers'
import {ApiService} from '@api/api-service';
import {AuthService} from '@src/app/core/services/auth-service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService)
    private apiService = inject(ApiService)

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        let authReq = this.setSecurityHeaders(req)

        if (authReq.url.includes('login')) return next.handle(authReq)
        /*
                const { access_token, exp } = this.authService.getAuthorization()
                const now = new Date().getTime() / 1000

                //refrescar el token
                if (
                    access_token &&
                    (exp - now) / 60 < 10 &&
                    req.url !== endpoints.auth.refresh(this.apiService.getApiUrl())
                )
                    this.authService.refresh(access_token)

                if (access_token)
                    authReq = req.clone({
                        headers: req.headers.set(
                            'Authorization',
                            `Bearer ${access_token}`,
                        ),
                    })
        */
        return next.handle(authReq)
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
                .set(
                    securityHeaders.xFrameOpt.header,
                    securityHeaders.xFrameOpt.content,
                )
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
