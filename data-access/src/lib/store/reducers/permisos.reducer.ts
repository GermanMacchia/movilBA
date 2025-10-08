import { Action, createReducer, on } from '@ngrx/store'
import { permisosError, permisosLoading, setModulos, setUsuarios } from '../actions/permisos.actions'

//STATE
export interface PermisosState {
	loading: boolean
	error: any
	usuarios: any
	modulos: any
}

//INITIAL
export const permisosInitialState: PermisosState = {
	loading: false,
	error: null,
	usuarios: null,
	modulos: null
}

//REDUCER
const _permisosReducer = createReducer(
	permisosInitialState,

	on(permisosLoading, state => ({
		...state,
		loading: false,
	})),

	on(setUsuarios, (state, { data }) => ({
		...state,
		usuarios: data
	})),

	on(setModulos, (state, { data }) => ({
		...state,
		modulos: data
	})),

	on(permisosError, (state, { data }) => ({
		...state,
		error: data
	}))
)

export function permisosReducer(state: PermisosState | undefined, action: Action<string>) {
	return _permisosReducer(state, action)
}
