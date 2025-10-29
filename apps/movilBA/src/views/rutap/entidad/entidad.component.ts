import { AsyncPipe } from '@angular/common'
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
import {
	DataTypes,
	InfoCardComponent,
	InfoCardData,
	InfoCardSection,
	SimpleListComponent,
} from '@movilBA/ui'
import { Store } from '@ngrx/store'
import {
	LineaCardComponent,
	LineaCardData,
	ModalLineasComponent,
	ModalVehiculosComponent,
} from 'apps/movilBA/src/components'
import { map, Observable } from 'rxjs'

@Component({
	selector: 'app-entidad',
	imports: [
		AsyncPipe,
		FormsModule,
		ModalLineasComponent,
		ModalVehiculosComponent,
		InfoCardComponent,
		LineaCardComponent,
		SimpleListComponent,
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

	// Modal de vehículo
	modalVehiculoAbierto = false
	vehiculoSeleccionado: Vehiculo | null = null

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

	// Métodos para el modal de línea
	abrirModalLinea(linea: Linea | LineaCardData) {
		this.lineaSeleccionada = linea as Linea
		this.modalLineaAbierto = true
	}

	cerrarModalLinea() {
		this.modalLineaAbierto = false
		this.lineaSeleccionada = null
	}

	// Métodos para manejar eventos de tarjetas de línea
	onLineaCardClick(linea: LineaCardData) {
		this.abrirModalLinea(linea as Linea)
	}

	onLineaViewDetails(linea: LineaCardData) {
		this.abrirModalLinea(linea as Linea)
	}

	// Métodos para el modal de vehículo
	abrirModalVehiculo(vehiculo: Vehiculo) {
		this.vehiculoSeleccionado = vehiculo
		this.modalVehiculoAbierto = true
	}

	cerrarModalVehiculo() {
		this.modalVehiculoAbierto = false
		this.vehiculoSeleccionado = null
	}

	getTotalParadas(linea: Linea): number {
		// Como la interfaz Ramal no tiene paradas, retornamos 0 por ahora
		// o podríamos usar otra lógica según los datos disponibles
		return 0
	}

	// Métodos para generar datos de InfoCard
	getInfoGeneralCard(entidad: Entidad): InfoCardData {
		return {
			title: 'Información General',
			titleIcon: 'bi bi-building',
			variant: 'minimal',
			sections: [
				{
					name: 'Estado',
					content: entidad.estado_operacional || 'N/A',
					type: 'badge',
					contentClass: 'bg-green-100 text-green-800',
				},
				{
					name: 'Nombre',
					content: entidad.nombre || 'N/A',
				},
				{
					name: 'Nombre Corto',
					content: entidad.nombre_corto || 'N/A',
				},
				{
					name: 'CUIT',
					content: entidad.cuit || 'N/A',
					contentClass: 'font-mono',
				},
				{
					name: 'Tipo',
					content: entidad.tipo_entidad || 'N/A',
				},
				{
					name: 'Razón Social',
					content: entidad.razon_social || 'N/A',
				},
			],
		}
	}

	// Arrays para usar con @for (mantener compatibilidad)
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

	getEstadisticasCard(entidad: Entidad): InfoCardData {
		return {
			title: 'Estadísticas',
			titleIcon: 'bi bi-bar-chart',
			variant: 'stats',
			layout: 'grid',
			gridCols: 4,
			sections: [
				{
					icon: 'bi bi-diagram-3',
					name: 'Líneas',
					content: entidad.total_lineas || 0,
					type: 'stat',
					contentClass: 'text-blue-600',
				},
				{
					icon: 'bi bi-shuffle',
					name: 'Ramales',
					content: entidad.total_ramales || 0,
					type: 'stat',
					contentClass: 'text-green-600',
				},
				{
					icon: 'bi bi-bus-front',
					name: 'Vehículos',
					content: entidad.total_vehiculos || 0,
					type: 'stat',
					contentClass: 'text-purple-600',
				},
				{
					icon: 'bi bi-people',
					name: 'Personas',
					content: entidad.total_personas || 0,
					type: 'stat',
					contentClass: 'text-orange-600',
				},
			],
		}
	}

	getEstadisticasItems(entidad: Entidad) {
		return [
			{ label: 'Líneas', value: entidad.total_lineas },
			{ label: 'Ramales', value: entidad.total_ramales },
			{ label: 'Vehículos', value: entidad.total_vehiculos },
			{ label: 'Personas', value: entidad.total_personas },
		]
	}

	getContactoPrincipalCard(entidad: Entidad): InfoCardData {
		const sections: InfoCardSection[] = []

		if (entidad.telefono_principal) {
			sections.push({
				icon: 'bi bi-telephone-fill',
				name: 'Teléfono principal',
				content: entidad.telefono_principal,
				isPrimary: true,
			})
		}

		if (entidad.email_principal) {
			sections.push({
				icon: 'bi bi-envelope-fill',
				name: 'Email principal',
				content: entidad.email_principal,
				contentClass: 'break-all',
				isPrimary: true,
			})
		}

		return {
			title: 'Contacto Principal',
			titleIcon: 'bi bi-telephone',
			variant: 'minimal',
			sections,
		}
	}

	// Método para generar tarjeta de contactos adicionales
	getContactosAdicionalesCard(entidad: Entidad): InfoCardData {
		const sections: InfoCardSection[] = []

		// Agregar teléfonos adicionales
		if (entidad.telefonos && entidad.telefonos.length > 0) {
			entidad.telefonos.forEach(telefono => {
				const telefonoInfo = this.getTelefonoInfo(telefono)
				sections.push({
					icon: 'bi bi-telephone',
					name: telefonoInfo.tipo || 'Teléfono',
					content: telefonoInfo.numero,
					isPrimary: telefonoInfo.primario,
				})
			})
		}

		// Agregar correos adicionales
		if (entidad.correos && entidad.correos.length > 0) {
			entidad.correos.forEach(correo => {
				const correoInfo = this.getCorreoInfo(correo)
				sections.push({
					icon: 'bi bi-envelope',
					name: correoInfo.tipo || 'Email',
					content: correoInfo.email,
					contentClass: 'break-all',
					isPrimary: correoInfo.primario,
				})
			})
		}

		return {
			title: 'Contactos Adicionales',
			titleIcon: 'bi bi-person-lines-fill',
			variant: 'minimal',
			sections,
		}
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

	// Configuración para simple-list de vehículos
	getVehiculosHeaders(): string[] {
		return ['Dominio', 'Estado', 'Tipo', 'Interno', 'Línea', 'Acciones']
	}

	getVehiculosDataKeys() {
		return [
			{ key: 'dominio', type: DataTypes.STRING },
			{ key: 'estado_vehiculo', type: DataTypes.STRING },
			{ key: 'tipo_vehiculo', type: DataTypes.STRING },
			{ key: 'interno', type: DataTypes.NUMBER },
			{ key: 'numero_linea', type: DataTypes.NUMBER },
		]
	}

	getVehiculosActions() {
		return [
			{
				icon: 'bi bi-info-circle',
				info: 'Ver información completa',
				action: (vehiculo: Vehiculo) => this.abrirModalVehiculo(vehiculo),
			},
		]
	}
}
