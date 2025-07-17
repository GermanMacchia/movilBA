import {inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, mergeMap, of} from 'rxjs'
import {AuthService} from '@src/app/core/services/auth-service';
import * as loginActions from '../actions/login.actions'
import {Auth} from '@interfaces';
import {ApiService} from '@api/api-service';

@Injectable()
export class LoginEffects {
    private actions$ = inject(Actions)
    private authService = inject(AuthService)
    private apiService = inject(ApiService)

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.login),
            mergeMap(({email, clave}) =>
                this.apiService.login(email, clave).pipe(
                    delay(1000),
                    map((auth: Auth) => {
                        this.authService.setAccessValues(auth)

                        return loginActions.setUsuario({usuario: auth.usuario})
                    }),
                    catchError(error => of(loginActions.loginError({error}))),
                ),
            ),
        ),
    )

    usuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.setUsuario),
            map(() => loginActions.loginSuccess())
        ),
    )

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.logout),
            map(() => {
                this.authService.logout()
                return loginActions.logoutSuccess()
            }),
        ),
    )
}

