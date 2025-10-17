import { inject } from '@angular/core'
import type { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { catchError, filter, of, switchMap, take, tap } from 'rxjs'
import { fetchEntidades, selectEntidades } from '../../store'

export const entidadesResolver: ResolveFn<any> = (_route, _state) => {
	const store$ = inject(Store)

	return store$.select(selectEntidades).pipe(
		take(1),
		tap(data => {
			if (!data) store$.dispatch(fetchEntidades())
		}),
		switchMap(() =>
			store$.select(selectEntidades).pipe(
				filter(updatedData => !!updatedData),
				take(1),
			),
		),
		catchError(() => of({ entidades: null })),
	)
}
