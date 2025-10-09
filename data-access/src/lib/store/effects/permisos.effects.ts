import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { PermisosApiService } from '../../api/permisos-api-service'
import {
	fetchModulos,
	fetchUsuarios,
	permisosError,
	setModulos,
	setUsuarios,
} from '../actions/permisos.actions'

@Injectable()
export class PermisosEffects {
	private actions$ = inject(Actions)
	private permisosApiService = inject(PermisosApiService)

	fetchUsuarios$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchUsuarios),
			switchMap(() => this.permisosApiService.usuarios()),
			map(usuarios => setUsuarios({ data: usuarios })),
			catchError(error => of(permisosError({ data: error }))),
		),
	)

	fetchModulos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchModulos),
			switchMap(() => this.permisosApiService.modulos()),
			map(modulos => setModulos({ data: modulos })),
			catchError(error => of(permisosError({ data: error }))),
		),
	)

	// createUsuario$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(createUsuario),
	// 		switchMap(({ data }) => this.permisosApiService.createUsuario()),
	// 		map((modulos) => setModulos({ data: modulos })),
	// 		catchError(error => of(permisosError({ data: error })))
	// 	)
	// )

	// createModulo$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(createModulo),
	// 		switchMap(({ data }) => this.permisosApiService.createUsuario()),
	// 		map((modulos) => setModulos({ data: modulos })),
	// 		catchError(error => of(permisosError({ data: error })))
	// 	)
	// )
}
