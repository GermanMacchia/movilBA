import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators'
import { fetchLogs } from '../../store/actions/permisos.actions'
import { selectLogs } from '../../store/selectors/permisos.selectors'

export const logsResolver: ResolveFn<any> = (_route, _state) => {
	const store$ = inject(Store)

	return store$.select(selectLogs).pipe(
		take(1),
		tap(logs => {
			if (!logs) store$.dispatch(fetchLogs())
		}),
		switchMap(() =>
			store$.select(selectLogs).pipe(
				filter(logs => !!logs),
				take(1),
				map(logs => logs),
			),
		),
		catchError(() => of({ data: [], total: 0 })),
	)
}
