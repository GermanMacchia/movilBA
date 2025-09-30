import { inject, Injectable } from '@angular/core'

import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'

import * as loginActions from '../actions/login.actions'
import { AuthApiService } from '../../api/auth-api-service'
import { AuthService } from '../../services'
import { Store } from '@ngrx/store'

@Injectable()
export class LoginEffects {
	private actions$ = inject(Actions)
	private apiService = inject(AuthApiService)
	private authService = inject(AuthService)

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginActions.login),
			mergeMap((form: { cuil: string; password: string }) =>
				this.apiService.login(form)
			),
			map(data => {
				this.authService.setSession(data)
				return loginActions.loginSuccess({ data })
			}),
			catchError(error => of(loginActions.loginError(error)))
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
