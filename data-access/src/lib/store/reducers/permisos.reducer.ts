import { Action, createReducer, on } from '@ngrx/store'
import { permisosError, permisosLoading, setUsuarios } from '../actions/permisos.actions'

//STATE
export interface PermisosState {
	loading: boolean
	error: any
	usuarios: any
}

//INITIAL
export const permisosInitialState: PermisosState = {
	loading: false,
	error: null,
	usuarios: null
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

	on(permisosError, (state, { data }) => ({
		...state,
		error: data
	}))
)

export function permisosReducer(state: PermisosState | undefined, action: Action<string>) {
	return _permisosReducer(state, action)
}
