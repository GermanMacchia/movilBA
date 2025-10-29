import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Vehiculo } from '@movil-ba/data-access'
import { DatePipe } from '@angular/common'

@Component({
	selector: 'app-modal-vehiculos',
	templateUrl: './modal-vehiculos.component.html',
	standalone: true,
	imports: [DatePipe],
})
export class ModalVehiculosComponent {
	@Input() modalAbierto = false
	@Input() vehiculoSeleccionado: Vehiculo | null = null
	@Output() cerrarModal = new EventEmitter<void>()

	onCerrarModal() {
		this.cerrarModal.emit()
	}

	getInfoGeneral() {
		if (!this.vehiculoSeleccionado) return []

		return [
			{ label: 'Dominio', value: this.vehiculoSeleccionado.dominio, type: 'text' },
			{ label: 'Interno', value: this.vehiculoSeleccionado.interno, type: 'text' },
			{
				label: 'Estado',
				value: this.vehiculoSeleccionado.estado_vehiculo,
				type: 'text',
			},
			{
				label: 'Tipo',
				value: this.vehiculoSeleccionado.tipo_vehiculo,
				type: 'text',
			},
			{
				label: 'Subtipo',
				value: this.vehiculoSeleccionado.subtipo_vehiculo,
				type: 'text',
			},
			{
				label: 'Línea',
				value: this.vehiculoSeleccionado.numero_linea,
				type: 'text',
			},
		].filter(item => item.value !== null && item.value !== undefined)
	}

	getInfoTecnica() {
		if (!this.vehiculoSeleccionado) return []

		return [
			{
				label: 'Chasis',
				value: this.vehiculoSeleccionado.numero_serie_chasis,
				type: 'text',
			},
			{
				label: 'Motor',
				value: this.vehiculoSeleccionado.numero_serie_motor,
				type: 'text',
			},
			{
				label: 'Carrocería',
				value: this.vehiculoSeleccionado.numero_serie_carroceria,
				type: 'text',
			},
			{
				label: 'Modelo Chasis',
				value: this.vehiculoSeleccionado.chasis_modelo,
				type: 'text',
			},
			{
				label: 'Fabricante Chasis',
				value: this.vehiculoSeleccionado.fabricante_chasis,
				type: 'text',
			},
			{
				label: 'Modelo Motor',
				value: this.vehiculoSeleccionado.motor_modelo,
				type: 'text',
			},
			{
				label: 'Fabricante Motor',
				value: this.vehiculoSeleccionado.fabricante_motor,
				type: 'text',
			},
			{
				label: 'Modelo Carrocería',
				value: this.vehiculoSeleccionado.carroceria_modelo,
				type: 'text',
			},
			{
				label: 'Fabricante Carrocería',
				value: this.vehiculoSeleccionado.fabricante_carroceria,
				type: 'text',
			},
		].filter(item => item.value !== null && item.value !== undefined)
	}

	getInfoAdicional() {
		if (!this.vehiculoSeleccionado) return []

		return [
			{
				label: 'Cantidad de Asientos',
				value: this.vehiculoSeleccionado.cantidad_asientos,
				type: 'text',
			},
			{
				label: 'Valor por Litro',
				value: this.vehiculoSeleccionado.valor_litro,
				type: 'text',
			},
			{
				label: 'Observaciones',
				value: this.vehiculoSeleccionado.asignacion_observaciones,
				type: 'text',
			},
		].filter(item => item.value !== null && item.value !== undefined)
	}

	getFechas() {
		if (!this.vehiculoSeleccionado) return []

		return [
			{
				label: 'Última Actualización',
				value: this.vehiculoSeleccionado.fecha_ultima_actualizacion,
				type: 'date',
			},
			{
				label: 'Asignación Desde',
				value: this.vehiculoSeleccionado.asignacion_fecha_desde,
				type: 'date',
			},
			{
				label: 'Asignación Hasta',
				value: this.vehiculoSeleccionado.asignacion_fecha_hasta,
				type: 'date',
			},
			{
				label: 'Línea Desde',
				value: this.vehiculoSeleccionado.linea_fecha_desde,
				type: 'date',
			},
			{
				label: 'Línea Hasta',
				value: this.vehiculoSeleccionado.linea_fecha_hasta,
				type: 'date',
			},
		].filter(item => item.value !== null && item.value !== undefined)
	}

	getEntidadInfo() {
		if (!this.vehiculoSeleccionado) return []

		return [
			{
				label: 'Entidad',
				value: this.vehiculoSeleccionado.entidad_nombre,
				type: 'text',
			},
			{
				label: 'Nombre Corto',
				value: this.vehiculoSeleccionado.entidad_nombre_corto,
				type: 'text',
			},
			{ label: 'CUIT', value: this.vehiculoSeleccionado.entidad_cuit, type: 'text' },
		].filter(item => item.value !== null && item.value !== undefined)
	}
}
