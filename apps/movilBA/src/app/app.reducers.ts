import { ActionReducerMap } from '@ngrx/store';
import {
    LoginReducer,
    LoginState,
    RutapReducer,
    RutapState
} from 'data-access/src/index';

export interface AppState {
    login: LoginState
    rutap: RutapState
}

export const appReducers: ActionReducerMap<AppState> = {
    login: LoginReducer,
    rutap: RutapReducer
}
