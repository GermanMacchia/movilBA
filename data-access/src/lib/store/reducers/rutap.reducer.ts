import { Action, createReducer, on } from '@ngrx/store'
import { rutapError, rutapLoading, setEntidades } from '../actions/rutap.actions'

//STATE
export interface RutapState {
	loading: boolean
	error: any
	entidades: any
}

//INITIAL
export const rutapInitialState: RutapState = {
	loading: false,
	error: null,
	entidades: null
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
		entidades: data
	})),

	on(rutapError, (state, { data }) => ({
		...state,
		error: data
	}))
)

export function rutapReducer(state: RutapState | undefined, action: Action<string>) {
	return _rutapReducer(state, action)
}
