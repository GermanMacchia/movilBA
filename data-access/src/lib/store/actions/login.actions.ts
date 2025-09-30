/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAction, props } from '@ngrx/store';
import { Session } from '../../interfaces/user.interfaces';


export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>(),
)

export const getCrsf = createAction('[Auth] get crsf')

export const crsfSuccess = createAction('[Auth] crsf success')

export const crsfError = createAction(
    '[Auth] CRSF Error',
    props<{ error: any }>(),
)

export const loginSuccess = createAction('[Auth] Login Success')

export const loginError = createAction(
    '[Auth] Login Error',
    props<{ error: any }>(),
)

export const logoutError = createAction(
    '[Auth] Logout Error',
    props<{ error: any }>(),
)

export const sessionError = createAction(
    '[Auth] Session Error',
    props<{ error: any }>(),
)

export const setSession = createAction(
    '[Auth] Set Usuario Data',
    props<{ data: Session }>(),
)

export const logoutSuccess = createAction('[Auth] LogoutSuccess')

export const logout = createAction('[Auth] Logout')
