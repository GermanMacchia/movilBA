/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ResolveFn } from '@angular/router'
import { of } from 'rxjs'
import mockData from '../utils/mockData.json'

export const displayResolver: ResolveFn<any> = (_route, _state) => {
	return of(mockData.ADMINISTRADOR.modulos)
}
