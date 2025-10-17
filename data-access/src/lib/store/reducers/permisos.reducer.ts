import { Action, createReducer, on } from '@ngrx/store'
import {
	permisosError,
	permisosLoading,
	setLogs,
	setModulos,
	setUsuarios,
} from '../actions/permisos.actions'
import { loginError } from '../actions/login.actions'

//STATE
export interface PermisosState {
	loading: boolean
	error: any
	usuarios: any
	modulos: any
	logs: any
}

//INITIAL
export const permisosInitialState: PermisosState = {
	loading: false,
	error: null,
	usuarios: null,
	modulos: null,
	logs: null,
}

//REDUCER
const _permisosReducer = createReducer(
	permisosInitialState,

	on(permisosLoading, state => ({
		...state,
		loading: false,
	})),

	on(loginError, (state, { error }) => ({
		...state,
		loading: false,
		error,
	})),

	on(setUsuarios, (state, { data }) => ({
		...state,
		usuarios: data,
	})),

	on(setModulos, (state, { data }) => ({
		...state,
		modulos: data,
	})),

	on(setLogs, (state, { data }) => ({
		...state,
		logs: data,
	})),

	on(permisosError, (state, { data }) => ({
		...state,
		loading: false,
		error: data,
	})),
)

export function permisosReducer(
	state: PermisosState | undefined,
	action: Action<string>,
) {
	return _permisosReducer(state, action)
}
