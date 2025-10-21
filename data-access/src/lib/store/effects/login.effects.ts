import { inject, Injectable } from '@angular/core'

import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'

import { AuthApiService } from '../../api/auth-api-service'
import { AuthService } from '../../services'
import * as loginActions from '../actions/login.actions'

@Injectable()
export class LoginEffects {
	private actions$ = inject(Actions)
	private apiService = inject(AuthApiService)
	private authService = inject(AuthService)

	health$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginActions.health),
			switchMap(() =>
				this.apiService.health().pipe(
					map(() => loginActions.appOperative()),
					catchError(() => of(loginActions.setAppInoperative())),
				),
			),
		),
	)

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginActions.login),
			switchMap((form: { cuil: string; password: string }) =>
				this.apiService.login(form).pipe(
					map(data => {
						this.authService.setSession(data)
						return loginActions.loginSuccess({ data })
					}),
					catchError(error => of(loginActions.loginError({ error }))),
				),
			),
		),
	)

	logout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginActions.logout),
				tap(() => this.authService.logout()),
			),
		{ dispatch: false },
	)
}
