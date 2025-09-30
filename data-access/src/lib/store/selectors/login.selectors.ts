import { createFeatureSelector, createSelector } from '@ngrx/store'

import { LoginState } from '../reducers/login.reducer'

export const selectSession = createSelector(
	createFeatureSelector<LoginState>('login'),
	state => state.session
)

export const selectLoginLoading = createSelector(
	createFeatureSelector<LoginState>('login'),
	state => state.loading
)
