import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { LogsApiService } from '../../api/logs-api-service'
import { PermisosApiService } from '../../api/permisos-api-service'
import {
	createPermission,
	createUsuario,
	deletePermission,
	deleteUsuario,
	fetchLogs,
	fetchModulos,
	fetchUsuarios,
	permisosError,
	setLogs,
	setModulos,
	setUsuarios,
	updateUsuario,
} from '../actions/permisos.actions'

@Injectable()
export class PermisosEffects {
	private actions$ = inject(Actions)
	private permisosApiService = inject(PermisosApiService)
	private logsApiService = inject(LogsApiService)

	fetchUsuarios$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchUsuarios),
			switchMap(() =>
				this.permisosApiService.usuarios().pipe(
					map(usuarios => setUsuarios({ data: usuarios })),
					catchError(error => of(permisosError({ data: error }))),
				),
			),
		),
	)

	fetchModulos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchModulos),
			switchMap(() =>
				this.permisosApiService.modulos().pipe(
					map(modulos => setModulos({ data: modulos })),
					catchError(error => of(permisosError({ data: error }))),
				),
			),
		),
	)

	createPermission$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createPermission),
			switchMap(data =>
				this.permisosApiService.createPermiso(data).pipe(
					map(() => fetchUsuarios()),
					catchError(error => of(permisosError({ data: error }))),
				),
			),
		),
	)

	deletePermission$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deletePermission),
			switchMap(({ id }) =>
				this.permisosApiService.deletePermiso(id).pipe(
					map(() => fetchUsuarios()),
					catchError(error => of(permisosError({ data: error }))),
				),
			),
		),
	)

	createUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createUsuario),
			switchMap(data =>
				this.permisosApiService.createUsuario(data).pipe(
					map(() => fetchUsuarios()),
					catchError(error => of(permisosError({ data: error }))),
				),
			),
		),
	)

	updateUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateUsuario),
			switchMap(data =>
				this.permisosApiService.updateUsuario(data).pipe(
					map(() => fetchUsuarios()),
					catchError(error => of(permisosError({ data: error }))),
				),
			),
		),
	)

	deleteUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(deleteUsuario),
			switchMap(({ id }) =>
				this.permisosApiService.deleteUsuario(id).pipe(
					map(() => fetchUsuarios()),
					catchError(error => of(permisosError({ data: error }))),
				),
			),
		),
	)

	fetchLogs$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchLogs),
			switchMap(() =>
				this.logsApiService.getLogs().pipe(
					map(logs => setLogs({ data: logs })),
					catchError(error => of(permisosError({ data: error }))),
				),
			),
		),
	)
}
