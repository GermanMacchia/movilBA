import { createFeatureSelector, createSelector } from '@ngrx/store'

import { LoginState } from './reducers/login.reducer'

export const selectSessionAuthenticated = createSelector(
	createFeatureSelector<LoginState>('login'),
	state => state.session?.authenticated
)

export const selectLoginLoading = createSelector(
	createFeatureSelector<LoginState>('login'),
	state => state.loading
)

export const selectDataLoading = createSelector(
	createFeatureSelector<LoginState>('data'),
	state => state.loading
)
