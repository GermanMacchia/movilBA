/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from '@angular/core'
import type { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import to from 'await-to-js'
import { firstValueFrom } from 'rxjs'
import { EntidadesApiService } from '../../api/entidades-api-service'
import { setEntidades } from '../../store'



export const entidadesResolver: ResolveFn<any> = async (_route, _state) => {
	const store$ = inject(Store)
	const entidadesApiService = inject(EntidadesApiService)
	const [error, data] = await to(firstValueFrom(entidadesApiService.entidades()))

	if (error) throw new Error('Entidades resolver error')
	store$.dispatch(setEntidades({ data }))

	return data
}
