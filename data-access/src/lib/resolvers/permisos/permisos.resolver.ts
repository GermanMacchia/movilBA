import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { inject } from '@angular/core'
import { of } from 'rxjs'
import { catchError, filter, switchMap, take } from 'rxjs/operators'
import { fetchUsuarios, selectUsuarios } from '../../store'

export const permisosResolver: ResolveFn<any> = (_route, _state) => {
  const store$ = inject(Store)

  return store$.select(selectUsuarios).pipe(
    take(1),
    switchMap(data => {
      if (data) return of(data)
      store$.dispatch(fetchUsuarios())
      return store$.select(selectUsuarios).pipe(
        filter(updatedData => !!updatedData),
        take(1)
      )
    }),
    catchError(error => of(error))
  )
}
