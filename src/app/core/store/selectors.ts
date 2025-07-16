import { createFeatureSelector, createSelector } from '@ngrx/store'
import { LoginState } from './reducers/login.reducer'

export const selectUsuario = createSelector(
    createFeatureSelector<LoginState>('login'),
    state => state.usuario,
)
