import { Usuario } from '@interfaces'
import { Action, createReducer, on } from '@ngrx/store'
import { login, loginError, loginSuccess } from '@src/app/core/store'

//STATE
export interface LoginState {
    loading: boolean
    error: any
    usuario: Usuario | null
}

//INITIAL
export const LoginInitialState: LoginState = {
    loading: false,
    error: null,
    usuario: null,
}

//REDUCER
const _LoginReducer = createReducer(
    LoginInitialState,

    on(login, state => ({
        ...state,
        loading: true,
    })),

    on(loginSuccess, (state, {usuario}) => ({
        ...state,
        usuario,
        loading: false,
    })),

    on(loginError, (state, {error}) => ({
        ...state,
        loading: false,
        error: error?.error,
    })),
)

export function LoginReducer(
    state: LoginState | undefined,
    action: Action<string>,
) {
    return _LoginReducer(state, action)
}
