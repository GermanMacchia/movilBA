import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { LogsApiService } from '../../api/logs-api-service'
import { PermisosApiService } from '../../api/permisos-api-service'
import * as permissionsActions from '../actions/permisos.actions'
import { Store } from '@ngrx/store'

@Injectable()
export class PermisosEffects {
	private actions$ = inject(Actions)
	private permisosApiService = inject(PermisosApiService)
	private logsApiService = inject(LogsApiService)
	private store$ = inject(Store)

	fetchUsuarios$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.fetchUsuarios),
			switchMap(() =>
				this.permisosApiService.usuarios().pipe(
					map(usuarios => permissionsActions.setUsuarios({ data: usuarios })),
					catchError(error => of(permissionsActions.permisosError({ error }))),
				),
			),
		),
	)

	fetchModulos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.fetchModulos),
			switchMap(() =>
				this.permisosApiService.modulos().pipe(
					map(modulos => permissionsActions.setModulos({ data: modulos })),
					catchError(error => of(permissionsActions.permisosError({ error }))),
				),
			),
		),
	)

	createPermission$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.createPermission),
			switchMap(data =>
				this.permisosApiService.createPermiso(data).pipe(
					map(() => {
						this.store$.dispatch(
							permissionsActions.setModified({ data: 'Permiso creado' }),
						)
						return permissionsActions.fetchUsuarios()
					}),
					catchError(error => of(permissionsActions.permisosError({ error }))),
				),
			),
		),
	)

	deletePermission$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.deletePermission),
			switchMap(({ id }) =>
				this.permisosApiService.deletePermiso(id).pipe(
					map(() => {
						this.store$.dispatch(
							permissionsActions.setModified({ data: 'Permiso borrado' }),
						)
						return permissionsActions.fetchUsuarios()
					}),
					catchError(error => of(permissionsActions.permisosError({ error }))),
				),
			),
		),
	)

	createUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.createUsuario),
			switchMap(data =>
				this.permisosApiService.createUsuario(data).pipe(
					map(() => {
						this.store$.dispatch(
							permissionsActions.setModified({ data: 'Usuario creado' }),
						)
						return permissionsActions.fetchUsuarios()
					}),
					catchError(error => {
						console.log(error)
						return of(permissionsActions.permisosError({ error }))
					}),
				),
			),
		),
	)

	updateUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.updateUsuario),
			switchMap(data =>
				this.permisosApiService.updateUsuario(data).pipe(
					map(() => {
						this.store$.dispatch(
							permissionsActions.setModified({
								data: 'Usuario actualizado',
							}),
						)
						return permissionsActions.fetchUsuarios()
					}),
					catchError(error => of(permissionsActions.permisosError({ error }))),
				),
			),
		),
	)

	deleteUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.deleteUsuario),
			switchMap(({ id }) =>
				this.permisosApiService.deleteUsuario(id).pipe(
					map(() => {
						this.store$.dispatch(
							permissionsActions.setModified({ data: 'Usuario desactivado' }),
						)
						return permissionsActions.fetchUsuarios()
					}),
					catchError(error => of(permissionsActions.permisosError({ error }))),
				),
			),
		),
	)

	restoreUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.restoreUsuario),
			switchMap(({ id }) =>
				this.permisosApiService.restoreUsuario(id).pipe(
					map(() => {
						this.store$.dispatch(
							permissionsActions.setModified({ data: 'Usuario restaurado' }),
						)
						return permissionsActions.fetchUsuarios()
					}),
					catchError(error => of(permissionsActions.permisosError({ error }))),
				),
			),
		),
	)

	fetchLogs$ = createEffect(() =>
		this.actions$.pipe(
			ofType(permissionsActions.fetchLogs),
			switchMap(() =>
				this.logsApiService.getLogs().pipe(
					map(logs => permissionsActions.setLogs({ data: logs })),
					catchError(error => of(permissionsActions.permisosError({ error }))),
				),
			),
		),
	)
}
