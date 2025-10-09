import { createAction, props } from '@ngrx/store'
import { Session } from '../../interfaces/session.interfaces'

export const login = createAction(
	'[Auth] Login',
	props<{ cuil: string; password: string }>(),
)

export const loginSuccess = createAction(
	'[Auth] Login Success',
	props<{ data: any }>(),
)

export const loginError = createAction('[Auth] Login Error', props<{ error: any }>())

export const logoutError = createAction(
	'[Auth] Logout Error',
	props<{ error: any }>(),
)

export const sessionError = createAction(
	'[Auth] Session Error',
	props<{ error: any }>(),
)

export const setSession = createAction(
	'[Auth] Set Usuario Data',
	props<{ data: Session }>(),
)

export const logoutSuccess = createAction('[Auth] LogoutSuccess')

export const logout = createAction('[Auth] Logout')
