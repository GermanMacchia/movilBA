/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store'
import { Session } from '../../interfaces/session.interfaces'
import {
	login,
	loginError,
	loginSuccess,
	logout,
	logoutError,
	sessionError,
	setSession,
} from '../index'

//STATE
export interface LoginState {
	loading: boolean
	error: any
	session: Session | null
}

//INITIAL
export const LoginInitialState: LoginState = {
	loading: false,
	error: null,
	session: null,
}

//REDUCER
const _LoginReducer = createReducer(
	LoginInitialState,

	on(login, state => ({
		...state,
		loading: true,
	})),

	on(sessionError, (state, { error }) => ({
		...state,
		loading: false,
		error: error?.error,
	})),

	on(loginSuccess, (state, { data }) => ({
		...state,
		loading: false,
		session: data,
	})),

	on(loginError, (state, { error }) => ({
		...state,
		loading: false,
		error: error?.error,
	})),

	on(logoutError, (state, { error }) => ({
		...state,
		loading: false,
		error: error?.error,
	})),

	on(logout, state => ({
		...state,
		session: null,
	}))
)

export function LoginReducer(state: LoginState | undefined, action: Action<string>) {
	return _LoginReducer(state, action)
}
