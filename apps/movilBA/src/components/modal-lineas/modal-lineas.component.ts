import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Linea } from '@movil-ba/data-access'

@Component({
	selector: 'app-modal-lineas',
	templateUrl: './modal-lineas.component.html',
	standalone: true,
})
export class ModalLineasComponent {
	@Input() modalAbierto = false
	@Input() lineaSeleccionada: Linea | null = null
	@Output() cerrarModal = new EventEmitter<void>()

	onCerrarModal() {
		this.cerrarModal.emit()
	}

	getTotalParadas(linea: Linea): number {
		return 0 // Implementar según la lógica de negocio
	}

	onBackdropClick() {
		this.onCerrarModal()
	}

	onModalClick(event: Event) {
		event.stopPropagation()
	}

	getInfoItems() {
		if (!this.lineaSeleccionada) return []

		const items = [
			{ label: 'Número', value: this.lineaSeleccionada.numero_linea, type: 'text' },
			{ label: 'ID Línea', value: this.lineaSeleccionada.linea_id, type: 'text' },
			{
				label: 'ID Entidad',
				value: this.lineaSeleccionada.entidad_id,
				type: 'text',
			},
		]

		if (this.lineaSeleccionada.color_linea) {
			items.push({
				label: 'Color',
				value: this.lineaSeleccionada.color_linea,
				type: 'color',
			})
		}

		return items
	}

	getEstadisticas() {
		if (!this.lineaSeleccionada) return []

		return [
			{
				label: 'Ramales',
				value: this.lineaSeleccionada.detalles.ramales?.length || 0,
			},
		]
	}

	getUbicaciones(ramal: any) {
		return [
			{
				tipo: 'Partida',
				valor: ramal.cabecera_partida,
				icon: 'bi-geo-alt-fill text-green-600',
			},
			{
				tipo: 'Destino',
				valor: ramal.cabecera_destino,
				icon: 'bi-geo-alt text-red-600',
			},
		]
	}

	getInfoAdicional(): { label: string; value: any }[] {
		if (!this.lineaSeleccionada?.detalles) return []

		const info: { label: string; value: any }[] = []
		const detalles = this.lineaSeleccionada.detalles

		const campos = [
			{ key: 'notas', label: 'Notas' },
			{ key: 'paradas', label: 'Paradas' },
			{ key: 'documentos', label: 'Documentos' },
			{ key: 'recorridos', label: 'Recorridos' },
			{ key: 'asignaciones', label: 'Asignaciones' },
		]

		campos.forEach(campo => {
			if (detalles[campo.key as keyof typeof detalles]) {
				info.push({
					label: campo.label,
					value: detalles[campo.key as keyof typeof detalles],
				})
			}
		})

		return info
	}
}
