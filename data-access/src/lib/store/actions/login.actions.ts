import { createAction, props } from '@ngrx/store'

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

export const logoutSuccess = createAction('[Auth] LogoutSuccess')

export const logout = createAction('[Auth] Logout')

export const health = createAction('[Auth] Health')

export const setAppInoperative = createAction('[Auth] App Inoperative')

export const appOperative = createAction('[Auth] App Operative')
