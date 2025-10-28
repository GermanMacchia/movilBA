import { AsyncPipe, TitleCasePipe } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import {
	selectEntidades,
	selectVehiculos,
	selectLineas,
	Linea,
	Vehiculo,
	Entidad,
} from '@movil-ba/data-access'
import { DataTypes } from '@movilBA/ui'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'

@Component({
	selector: 'app-entidad',
	imports: [AsyncPipe, TitleCasePipe, FormsModule],
	templateUrl: './entidad.component.html',
	styles: `
		.input,
		.select {
			&:focus,
			&:focus-within {
				--input-color: none;
				outline: none;
			}
		}
	`,
})
export class EntidadComponent {
	store$ = inject(Store)
	route = inject(ActivatedRoute)
	dataTypes = DataTypes
	selectedLinea = signal<number | null>(null)
	entidad_id: number

	// Filtros para vehículos
	searchTerm = ''
	selectedLineaFilter = ''

	// Modal de línea
	modalLineaAbierto = false
	lineaSeleccionada: Linea | null = null

	constructor() {
		this.entidad_id = Number(this.route.snapshot.paramMap.get('id'))
		console.log(this.entidad_id)
	}

	entidad$: Observable<Entidad | null> = this.store$.select(selectEntidades).pipe(
		map(entidades => {
			return entidades?.find((e: any) => e.id === this.entidad_id)
		}),
	)

	lineas$: Observable<Linea[]> = this.store$.select(selectLineas).pipe(
		map(lineas => {
			return lineas[this.entidad_id as keyof {}] || []
		}),
	)

	vehiculos$: Observable<Vehiculo[]> = this.store$.select(selectVehiculos).pipe(
		map(vehiculos => {
			return vehiculos[this.entidad_id as keyof {}] || []
		}),
	)

	vehiculosFiltrados = signal<any[]>([])

	getCorreoInfo(correo: any): {
		email: string
		tipo: string
		primario: boolean
		observaciones?: string
	} {
		if (typeof correo === 'string') {
			return { email: correo, tipo: '', primario: false }
		}
		return {
			email: correo?.correo || correo?.email || '',
			tipo: correo?.tipo_correo || '',
			primario: correo?.es_primario || false,
			observaciones: correo?.observaciones || '',
		}
	}

	getTelefonoInfo(telefono: any): {
		numero: string
		tipo?: string
		primario?: boolean
		observaciones?: string
	} {
		if (typeof telefono === 'string') {
			return { numero: telefono }
		}
		return {
			numero: telefono?.numero || telefono?.telefono || '',
			tipo: telefono?.tipo_telefono || '',
			primario: telefono?.es_primario || false,
			observaciones: telefono?.observaciones || '',
		}
	}

	onLineaSelected(linea: any) {
		this.selectedLinea.set(linea.numero_linea)

		// Filtrar vehículos por línea seleccionada
		const subscription = this.vehiculos$.subscribe(vehiculos => {
			if (vehiculos && Array.isArray(vehiculos)) {
				const filtrados = (vehiculos as any[]).filter(
					(vehiculo: any) => vehiculo.numero_linea === linea.numero_linea,
				)
				this.vehiculosFiltrados.set(filtrados)
			} else {
				this.vehiculosFiltrados.set([])
			}
		})
		subscription.unsubscribe()
	}

	// Métodos para filtrado de vehículos
	onSearchChange(event: any) {
		this.searchTerm = event.target.value
	}

	onLineaFilterChange(event: any) {
		this.selectedLineaFilter = event.target.value
	}

	getVehiculosFiltrados(vehiculos: Vehiculo[]): Vehiculo[] {
		if (!vehiculos) return []

		let filtrados = [...vehiculos]

		// Filtrar por término de búsqueda
		if (this.searchTerm.trim()) {
			const termino = this.searchTerm.toLowerCase().trim()
			filtrados = filtrados.filter(
				vehiculo =>
					vehiculo.dominio?.toLowerCase().includes(termino) ||
					vehiculo.interno?.toString().toLowerCase().includes(termino) ||
					vehiculo.tipo_vehiculo?.toLowerCase().includes(termino),
			)
		}

		// Filtrar por línea seleccionada
		if (this.selectedLineaFilter) {
			filtrados = filtrados.filter(
				vehiculo => vehiculo.numero_linea?.toString() === this.selectedLineaFilter,
			)
		}

		return filtrados
	}

	getLineasUnicas(vehiculos: Vehiculo[]): string[] {
		if (!vehiculos) return []

		const lineas = vehiculos
			.map(v => v.numero_linea?.toString())
			.filter((linea, index, arr) => linea && arr.indexOf(linea) === index)
			.sort((a, b) => {
				const numA = parseInt(a || '0')
				const numB = parseInt(b || '0')
				return numA - numB
			})

		return lineas as string[]
	}

	// Métodos para el modal de línea
	abrirModalLinea(linea: Linea) {
		this.lineaSeleccionada = linea
		this.modalLineaAbierto = true
	}

	cerrarModalLinea() {
		this.modalLineaAbierto = false
		this.lineaSeleccionada = null
	}

	getTotalParadas(linea: Linea): number {
		// Como la interfaz Ramal no tiene paradas, retornamos 0 por ahora
		// o podríamos usar otra lógica según los datos disponibles
		return 0
	}
}
