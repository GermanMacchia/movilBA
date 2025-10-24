import type { ResolveFn } from '@angular/router'
import { of } from 'rxjs'
import { ACCIONES, MODULOS } from '../interfaces'
import { ModulosRoutes } from '../interfaces/interfaces'

export const displayResolver: ResolveFn<any> = (_route, _state) => {
	const modulos: ModulosRoutes[] = [
		{
			label: 'RUTAP (Colectivos)',
			routerLink: '/rutap',
			color: '#5EABD6',
			icon: 'bi bi-bus-front-fill',
			only: `${MODULOS.rutap}.${ACCIONES.read}`,
		},
		{
			label: 'RUTAX (Taxis)',
			routerLink: '/secciones',
			color: '#FFAB5B',
			icon: 'bi bi-taxi-front-fill',
			only: `${MODULOS.rutax}.${ACCIONES.read}`,
		},
		{
			label: 'RUREM (Remises)',
			routerLink: '/secciones',
			color: '#E9A5F1',
			icon: 'bi bi-car-front-fill',
			only: `${MODULOS.rurem}.${ACCIONES.read}`,
		},
		{
			label: 'RUTRAMUR (Moto/Bici Delivery)',
			routerLink: '/secciones',
			color: '#B771E5',
			icon: 'bi bi-bicycle',
			only: `${MODULOS.rutramur}.${ACCIONES.read}`,
		},
		{
			label: 'Cursos de capacitación',
			routerLink: '/secciones',
			color: '#C68EFD',
			icon: 'bi bi-camera-video-fill',
			only: `${MODULOS.capacitacion}.${ACCIONES.read}`,
		},
		{
			label: 'VTV',
			routerLink: '/secciones',
			color: '#4DA1A9',
			icon: 'bi bi-journal-check',
			only: `${MODULOS.vtv}.${ACCIONES.read}`,
		},
		{
			label: 'Escolares',
			routerLink: '/secciones',
			color: '#FFAB5B',
			icon: 'bi bi-bus-front',
			only: `${MODULOS.escolares}.${ACCIONES.read}`,
		},
		{
			label: 'Pesados',
			routerLink: '/secciones',
			color: '#465aba',
			icon: 'bi bi-cone-striped',
			only: `${MODULOS.pesados}.${ACCIONES.read}`,
		},
		{
			label: 'Verificaciones especiales',
			routerLink: '/secciones',
			color: '#A1E3F9',
			icon: 'bi bi-ui-checks',
			only: `${MODULOS.verificaciones}.${ACCIONES.read}`,
		},
	]

	return of(modulos)
}
