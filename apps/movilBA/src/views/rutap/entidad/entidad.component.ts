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
import {
	ListaVehiculosComponent,
	ModalLineasComponent,
} from 'apps/movilBA/src/components'
import { map, Observable } from 'rxjs'

@Component({
	selector: 'app-entidad',
	imports: [
		AsyncPipe,
		TitleCasePipe,
		FormsModule,
		ModalLineasComponent,
		ListaVehiculosComponent,
	],
	templateUrl: './entidad.component.html',
})
export class EntidadComponent {
	store$ = inject(Store)
	route = inject(ActivatedRoute)
	dataTypes = DataTypes
	selectedLinea = signal<number | null>(null)
	entidad_id: number

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

	// Arrays para usar con @for
	getInfoGeneralItems(entidad: Entidad) {
		return [
			{
				label: 'Estado',
				value: entidad.estado_operacional,
				pipe: 'titlecase',
				type: 'badge',
				class: 'bg-green-100 text-green-800',
			},
			{ label: 'Nombre', value: entidad.nombre, pipe: 'titlecase' },
			{ label: 'Nombre Corto', value: entidad.nombre_corto, pipe: 'titlecase' },
			{ label: 'CUIT', value: entidad.cuit, class: 'font-mono' },
			{ label: 'Tipo', value: entidad.tipo_entidad, pipe: 'titlecase' },
			{ label: 'Razón Social', value: entidad.razon_social, pipe: 'titlecase' },
		]
	}

	getEstadisticasItems(entidad: Entidad) {
		return [
			{ label: 'Líneas', value: entidad.total_lineas },
			{ label: 'Ramales', value: entidad.total_ramales },
			{ label: 'Vehículos', value: entidad.total_vehiculos },
			{ label: 'Personas', value: entidad.total_personas },
		]
	}

	getContactoPrincipalItems(entidad: Entidad) {
		const items = []
		if (entidad.telefono_principal) {
			items.push({
				icon: 'bi-telephone-fill',
				value: entidad.telefono_principal,
				label: 'Teléfono principal',
			})
		}
		if (entidad.email_principal) {
			items.push({
				icon: 'bi-envelope-fill',
				value: entidad.email_principal,
				label: 'Email principal',
				class: 'break-all',
			})
		}
		return items
	}
}
