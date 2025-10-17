import { Action, createReducer, on } from '@ngrx/store'
import { Session } from '../../interfaces/session.interfaces'
import { login, loginError, loginSuccess, logout, logoutError } from '../index'

//STATE
export interface LoginState {
	loading: boolean
	error: any
	session: Session | null
}

//INITIAL
export const loginInitialState: LoginState = {
	loading: false,
	error: null,
	session: null,
}

//REDUCER
const _loginReducer = createReducer(
	loginInitialState,

	on(login, state => ({
		...state,
		loading: true,
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
	})),
)

export function loginReducer(state: LoginState | undefined, action: Action<string>) {
	return _loginReducer(state, action)
}
