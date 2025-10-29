import { inject } from '@angular/core'
import type { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { catchError, combineLatest, filter, of, switchMap, take, tap } from 'rxjs'
import {
	fetchEntidades,
	fetchVehiculos,
	fetchLineas,
	selectEntidades,
	selectVehiculos,
	selectLineas,
} from '../../store'

export const empresasResolver: ResolveFn<any> = (route, _state) => {
	const store$ = inject(Store)
	const entidad_id = route.paramMap.get('id')

	if (!entidad_id) return of(null)

	return combineLatest([
		store$.select(selectEntidades),
		store$.select(selectVehiculos),
		store$.select(selectLineas),
	]).pipe(
		take(1),
		tap(([entidades, vehiculos, lineas]) => {
			// Solo despachar si los datos no están disponibles
			if (!entidades || entidades.length === 0) {
				store$.dispatch(fetchEntidades())
			}

			if (!vehiculos[entidad_id as keyof {}]) {
				store$.dispatch(fetchVehiculos({ entidad_id }))
			}

			if (!lineas[entidad_id as keyof {}]) {
				store$.dispatch(fetchLineas({ entidad_id }))
			}
		}),
		switchMap(() =>
			combineLatest([
				store$
					.select(selectEntidades)
					.pipe(filter(entidades => !!entidades && entidades.length > 0)),
				store$
					.select(selectVehiculos)
					.pipe(filter(vehiculos => !!vehiculos[entidad_id as keyof {}])),
				store$
					.select(selectLineas)
					.pipe(filter(lineas => !!lineas[entidad_id as keyof {}])),
			]).pipe(take(1)),
		),
		catchError(() => of({ entidades: null, vehiculos: null, lineas: null })),
	)
}
