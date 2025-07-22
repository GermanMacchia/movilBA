import {createFeatureSelector, createSelector} from '@ngrx/store'
import {LoginState} from './reducers/login.reducer'
import {DataState} from '@src/app/core/store/reducers/data.reducer';

export const selectUsuario = createSelector(
    createFeatureSelector<LoginState>('login'),
    state => state.usuario,
)

export const selectLoginLoading = createSelector(
    createFeatureSelector<LoginState>('login'),
    state => state.loading,
)

export const selectSecciones = createSelector(
    createFeatureSelector<DataState>('data'),
    state => state.data.secciones,
)
export const selectModulos = createSelector(
    createFeatureSelector<DataState>('data'),
    state => state.data.modulos,
)

export const selectOpciones = createSelector(
    createFeatureSelector<DataState>('data'),
    state => state.data.opciones,
)

export const selectDataLoading = createSelector(
    createFeatureSelector<LoginState>('data'),
    state => state.loading,
)
