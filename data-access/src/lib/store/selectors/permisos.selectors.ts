import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PermisosState } from '../reducers/permisos.reducer'

export const selectPermisosLoading = createSelector(
	createFeatureSelector<PermisosState>('permisos'),
	state => state.loading,
)

export const selectUsuarios = createSelector(
	createFeatureSelector<PermisosState>('permisos'),
	state => state.usuarios,
)

export const selectModulos = createSelector(
	createFeatureSelector<PermisosState>('permisos'),
	state => state.modulos,
)

export const selectLogs = createSelector(
	createFeatureSelector<PermisosState>('permisos'),
	state => state.logs,
)

export const selectLogsData = createSelector(selectLogs, logs => logs?.data || [])

export const selectLogsTotal = createSelector(selectLogs, logs => logs?.total || 0)
