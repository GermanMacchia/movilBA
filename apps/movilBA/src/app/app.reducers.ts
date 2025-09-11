import { ActionReducerMap } from '@ngrx/store';
import {
    LoginReducer,
    LoginState
} from 'data-access/src/index';

export interface AppState {
    login: LoginState
}

export const appReducers: ActionReducerMap<AppState> = {
    login: LoginReducer
}
