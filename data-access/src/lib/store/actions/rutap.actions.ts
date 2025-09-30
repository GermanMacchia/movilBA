/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';

export const setEntidades = createAction(
    '[Rutap] set Entidades',
    props<{ data: any }>(),
)

export const rutapLoading = createAction('[Rutap] data Loading')