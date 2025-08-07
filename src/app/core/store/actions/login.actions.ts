import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../interfaces/interfaces';


export const login = createAction(
    '[Auth] Login',
    props<{ cuit: string; clave: string }>(),
)

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ usuario: Usuario }>()
)

export const loginError = createAction(
    '[Auth] Login Error',
    props<{ error: any }>(),
)


export const logoutSuccess = createAction('[Auth] LogoutSuccess')

export const logout = createAction('[Auth] Logout')
