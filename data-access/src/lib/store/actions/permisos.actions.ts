import { createAction, props } from '@ngrx/store'

export const fetchUsuarios = createAction('[Permisos] fetching Usuarios')

export const fetchModulos = createAction('[Permisos] fetching Modulos')

export const setUsuarios = createAction(
	'[Permisos] set Usuarios',
	props<{ data: any }>(),
)

export const setModulos = createAction(
	'[Permisos] set Modulos',
	props<{ data: any }>(),
)

export const permisosLoading = createAction('[Permisos] data Loading')
export const permisosError = createAction(
	'[Permisos] set Error',
	props<{ data: any }>(),
)
