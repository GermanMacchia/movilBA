import { Action, createReducer, on } from '@ngrx/store'
import {
	permisosError,
	permisosLoading,
	setLogs,
	setModified,
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
	modified: null | string
	logs: any
}

//INITIAL
export const permisosInitialState: PermisosState = {
	loading: false,
	error: null,
	usuarios: null,
	modified: null,
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

	on(setModified, (state, { data }) => ({
		...state,
		modified: data,
	})),

	on(setModulos, (state, { data }) => ({
		...state,
		modulos: data,
	})),

	on(setLogs, (state, { data }) => ({
		...state,
		logs: data,
	})),

	on(permisosError, (state, { error }) => ({
		...state,
		loading: false,
		error: error,
	})),
)

export function permisosReducer(
	state: PermisosState | undefined,
	action: Action<string>,
) {
	return _permisosReducer(state, action)
}
