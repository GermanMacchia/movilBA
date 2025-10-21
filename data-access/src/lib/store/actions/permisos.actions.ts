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

export const createUsuario = createAction(
	'[Permisos] create Usuario',
	props<{ data: any }>(),
)

export const setModified = createAction(
	'[Permisos] data mutation',
	props<{ data: any }>(),
)

export const updateUsuario = createAction(
	'[Permisos] update Usuario',
	props<{ data: any }>(),
)

export const deleteUsuario = createAction(
	'[Permisos] delete Usuario',
	props<{ id: number }>(),
)

export const restoreUsuario = createAction(
	'[Permisos] restore Usuario',
	props<{ id: number }>(),
)

export const createModulo = createAction(
	'[Permisos] create Modulo',
	props<{ data: any }>(),
)

export const createPermission = createAction(
	'[Permisos] create Permission',
	props<{ usuario_id: number; modulo_id: number; permisos: string }>(),
)

export const deletePermission = createAction(
	'[Permisos] delete Permission',
	props<{ id: number }>(),
)

export const fetchLogs = createAction('[Permisos] fetching Logs')

export const setLogs = createAction('[Permisos] set Logs', props<{ data: any }>())

export const permisosLoading = createAction('[Permisos] data Loading')
export const permisosError = createAction(
	'[Permisos] set Error',
	props<{ error: any }>(),
)
