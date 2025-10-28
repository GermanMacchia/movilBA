import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { RutapApiService } from '../../api/rutap-api-service'
import {
	fetchEntidades,
	fetchVehiculos,
	fetchLineas,
	rutapError,
	setEntidades,
	setVehiculos,
	setLineas,
} from '../actions/rutap.actions'

@Injectable()
export class RutapEffects {
	private actions$ = inject(Actions)
	private rutapApiService = inject(RutapApiService)
	private store$ = inject(Store)

	fetchEntidades$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchEntidades),
			switchMap(() =>
				this.rutapApiService.entidades().pipe(
					map(entidades => setEntidades({ data: entidades })),
					catchError(error => of(rutapError({ data: error }))),
				),
			),
		),
	)

	fetchVehiculos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchVehiculos),
			switchMap(({ entidad_id }) =>
				this.rutapApiService.vehiculos(+entidad_id).pipe(
					map(vehiculos =>
						setVehiculos({ data: vehiculos, entidad_id: +entidad_id }),
					),
					catchError(error => of(rutapError({ data: error }))),
				),
			),
		),
	)

	fetchLineas$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchLineas),
			switchMap(({ entidad_id }) =>
				this.rutapApiService.lineas(+entidad_id).pipe(
					map(lineas => setLineas({ data: lineas, entidad_id: +entidad_id })),
					catchError(error => of(rutapError({ data: error }))),
				),
			),
		),
	)
}
