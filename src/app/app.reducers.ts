import { ActionReducerMap } from '@ngrx/store'
import {
    LoginReducer,
    LoginState
} from '@src/app/core/store';

export interface AppState {
    login: LoginState
}

export const appReducers: ActionReducerMap<AppState> = {
    login: LoginReducer,
}
