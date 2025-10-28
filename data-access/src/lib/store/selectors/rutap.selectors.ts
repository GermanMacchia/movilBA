import { createFeatureSelector, createSelector } from '@ngrx/store'
import { RutapState } from '../reducers/rutap.reducer'

export const selectRutapLoading = createSelector(
	createFeatureSelector<RutapState>('rutap'),
	state => state.loading,
)

export const selectEntidades = createSelector(
	createFeatureSelector<RutapState>('rutap'),
	state => state.entidades,
)

export const selectVehiculos = createSelector(
	createFeatureSelector<RutapState>('rutap'),
	state => state.vehiculos,
)

export const selectLineas = createSelector(
	createFeatureSelector<RutapState>('rutap'),
	state => state.lineas,
)
