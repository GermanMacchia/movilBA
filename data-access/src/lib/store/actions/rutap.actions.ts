import { createAction, props } from '@ngrx/store';

export const fetchEntidades = createAction(
    '[Rutap] fetching Entidades'
)

export const setEntidades = createAction(
    '[Rutap] set Entidades',
    props<{ data: any }>(),
)

export const rutapLoading = createAction('[Rutap] data Loading')
export const rutapError = createAction(
    '[Rutap] set Error',
    props<{ data: any }>(),
)