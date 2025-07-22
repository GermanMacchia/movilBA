import {ActionReducerMap} from '@ngrx/store'
import {
    DataReducer, DataState,
    LoginReducer,
    LoginState
} from '@src/app/core/store';

export interface AppState {
    login: LoginState
    data: DataState
}

export const appReducers: ActionReducerMap<AppState> = {
    login: LoginReducer,
    data: DataReducer
}
