import { inject, Injectable } from '@angular/core';
import { ApiService } from '@api/api-service';
import { Auth } from '@interfaces';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@src/app/core/services/auth-service';
import { catchError, delay, map, mergeMap, of } from 'rxjs';
import * as loginActions from '../actions/login.actions';

@Injectable()
export class LoginEffects {
    private actions$ = inject(Actions)
    private authService = inject(AuthService)
    private apiService = inject(ApiService)

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginActions.login),
            mergeMap(({cuit, clave}) =>
                this.apiService.login(cuit, clave).pipe(
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
            map(({usuario}) => loginActions.loginSuccess({rol:usuario.rol})),
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

