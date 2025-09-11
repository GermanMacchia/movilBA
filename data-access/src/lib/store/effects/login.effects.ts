/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core'

import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'

import * as loginActions from '../actions/login.actions'
import { AuthApiService } from '../../api/auth-api-service'
import { AuthService } from '../../services'

@Injectable()
export class LoginEffects {
	private actions$ = inject(Actions)
	private apiService = inject(AuthApiService)
	private authService = inject(AuthService)

	csrf$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginActions.getCrsf),
			mergeMap(() =>
				this.apiService.csrf().pipe(
					map(() => loginActions.crsfSuccess()),
					catchError(error => of(loginActions.crsfError(error)))
				)
			)
		)
	)

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginActions.login),
			mergeMap((form: { email: string; password: string }) =>
				this.apiService.login(form).pipe(
					map(() => loginActions.loginSuccess()),
					catchError(error => of(loginActions.loginError(error)))
				)
			)
		)
	)

	usuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginActions.loginSuccess),
			mergeMap(() =>
				this.apiService.getSession().pipe(
					map(data => {
						this.authService.setSession(data)
						return loginActions.setSession({ data } as any)
					}),
					catchError(error => of(loginActions.sessionError(error)))
				)
			)
		)
	)

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginActions.logout),
			mergeMap(() => this.apiService.logout()),
			map(() => {
				this.authService.logout()
				return loginActions.logoutSuccess()
			}),
			catchError(error => of(loginActions.logoutError(error)))
		)
	)
}
