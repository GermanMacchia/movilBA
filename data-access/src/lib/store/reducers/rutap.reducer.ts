/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store'
import { rutapLoading, setEntidades } from '../actions/rutap.actions'

//STATE
export interface RutapState {
	loading: boolean
	error: any
	entidades:any
}

//INITIAL
export const RutapInitialState: RutapState = {
	loading: false,
	error: null,
	entidades: null
}

//REDUCER
const _RutapReducer = createReducer(
	RutapInitialState,

	on(rutapLoading, state => ({
		...state,
		loading: false,
	})),

	on(setEntidades, (state, {data}) => ({
		...state,
		entidades: data
	}))
)

export function RutapReducer(state: RutapState | undefined, action: Action<string>) {
	return _RutapReducer(state, action)
}
