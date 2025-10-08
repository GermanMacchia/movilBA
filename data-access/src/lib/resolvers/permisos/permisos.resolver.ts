import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { combineLatest, of } from 'rxjs'
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators'
import { fetchModulos, fetchUsuarios, selectModulos, selectUsuarios } from '../../store'

export const permisosResolver: ResolveFn<any> = (_route, _state) => {
  const store$ = inject(Store)

  return combineLatest([
    store$.select(selectUsuarios),
    store$.select(selectModulos)
  ]).pipe(
    take(1),
    tap(([usuarios, modulos]) => {
      if (!usuarios) store$.dispatch(fetchUsuarios())
      if (!modulos) store$.dispatch(fetchModulos())
    }),
    switchMap(() =>
      combineLatest([
        store$.select(selectUsuarios),
        store$.select(selectModulos)
      ]).pipe(
        filter(([usuarios, modulos]) => !!usuarios && !!modulos),
        take(1),
        map(([usuarios, modulos]) => ({ usuarios, modulos }))
      )
    ),
    catchError(() => of({ usuarios: null, modulos: null }))
  )
}