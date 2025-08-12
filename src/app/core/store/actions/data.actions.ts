import {createAction, props} from '@ngrx/store'
import {DataJSON} from '@interfaces';

export const dataLoading = createAction('[Data] Loading')

export const dataLoadingSuccess = createAction('[Data] Data loading Success')

export const dataLoadingError = createAction(
    '[Data] Data Loading Error',
    props<{ error: any }>(),
)

export const setData = createAction(
    '[Data] Set Data',
    props<{ data: any }>(),
)
