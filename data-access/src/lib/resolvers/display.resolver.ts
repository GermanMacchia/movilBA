/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ResolveFn } from '@angular/router'
import mockData from '../utils/mockData.json'
import { of } from 'rxjs'


export const displayResolver: ResolveFn<any[]> = (_route, _state) => {
	return of(mockData.ADMINISTRADOR.modulos)
}
