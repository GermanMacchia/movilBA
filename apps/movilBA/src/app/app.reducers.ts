import { ActionReducerMap } from '@ngrx/store'
import {
	loginReducer,
	LoginState,
	rutapReducer,
	RutapState,
} from 'data-access/src/index'
import { permisosReducer, PermisosState } from 'data-access/src/lib/store'

export interface AppState {
	login: LoginState
	rutap: RutapState
	permisos: PermisosState
}

export const appReducers: ActionReducerMap<AppState> = {
	login: loginReducer,
	rutap: rutapReducer,
	permisos: permisosReducer,
}
