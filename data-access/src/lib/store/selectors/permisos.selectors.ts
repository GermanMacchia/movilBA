import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PermisosState } from "../reducers/permisos.reducer";


export const selectPermisosLoading = createSelector(
    createFeatureSelector<PermisosState>('permisos'),
    state => state.loading
)

export const selectUsuarios = createSelector(
    createFeatureSelector<PermisosState>('permisos'),
    state => state.usuarios
)