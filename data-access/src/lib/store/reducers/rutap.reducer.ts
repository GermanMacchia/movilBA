import { Action, createReducer, on } from '@ngrx/store'
import {
	rutapError,
	rutapLoading,
	setEntidades,
	setVehiculos,
	setLineas,
} from '../actions/rutap.actions'
import { map } from 'rxjs'

//STATE
export interface RutapState {
	loading: boolean
	error: any
	entidades: null | any[]
	vehiculos: object
	lineas: object
}

//INITIAL
export const rutapInitialState: RutapState = {
	loading: false,
	error: null,
	entidades: null,
	vehiculos: {},
	lineas: {},
}

//REDUCER
const _rutapReducer = createReducer(
	rutapInitialState,

	on(rutapLoading, state => ({
		...state,
		loading: false,
	})),

	on(setEntidades, (state, { data }) => ({
		...state,
		entidades: data,
		loading: false,
	})),

	on(setVehiculos, (state, { data, entidad_id }) => ({
		...state,
		vehiculos: { ...state.vehiculos, [entidad_id]: data },
		loading: false,
	})),

	on(setLineas, (state, { data, entidad_id }) => ({
		...state,
		lineas: { ...state.lineas, [entidad_id]: data },
		loading: false,
	})),

	on(rutapError, (state, { data }) => ({
		...state,
		error: data,
		loading: false,
	})),
)

export function rutapReducer(state: RutapState | undefined, action: Action<string>) {
	return _rutapReducer(state, action)
}
