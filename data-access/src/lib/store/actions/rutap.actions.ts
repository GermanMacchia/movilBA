import { createAction, props } from '@ngrx/store'

export const fetchEntidades = createAction('[Rutap] fetching Entidades')

export const setEntidades = createAction(
	'[Rutap] set Entidades',
	props<{ data: any }>(),
)

export const fetchVehiculos = createAction(
	'[Rutap] fetching vehiculos',
	props<{ entidad_id: any }>(),
)

export const setVehiculos = createAction(
	'[Rutap] set Vehiculos',
	props<{ data: any; entidad_id: number }>(),
)

export const fetchLineas = createAction(
	'[Rutap] fetching lineas',
	props<{ entidad_id: any }>(),
)

export const setLineas = createAction(
	'[Rutap] set Lineas',
	props<{ data: any; entidad_id: number }>(),
)

export const rutapLoading = createAction('[Rutap] data Loading')
export const rutapError = createAction('[Rutap] set Error', props<{ data: any }>())
