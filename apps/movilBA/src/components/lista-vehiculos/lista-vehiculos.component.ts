import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TitleCasePipe } from '@angular/common'
import { Vehiculo } from '@movil-ba/data-access'

@Component({
	selector: 'app-lista-vehiculos',
	templateUrl: './lista-vehiculos.component.html',
	standalone: true,
	imports: [FormsModule, TitleCasePipe],
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
export class ListaVehiculosComponent {
	@Input() vehiculos: Vehiculo[] = []

	searchTerm = ''
	selectedLineaFilter = ''

	onSearchChange(event: any) {
		this.searchTerm = event.target.value
	}

	onLineaFilterChange(event: any) {
		this.selectedLineaFilter = event.target.value
	}

	getVehiculosFiltrados(): Vehiculo[] {
		if (!this.vehiculos) return []

		let filtrados = [...this.vehiculos]

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

	getLineasUnicas(): string[] {
		if (!this.vehiculos) return []

		const lineas = this.vehiculos
			.map(v => v.numero_linea?.toString())
			.filter((linea, index, arr) => linea && arr.indexOf(linea) === index)
			.sort((a, b) => {
				const numA = parseInt(a || '0')
				const numB = parseInt(b || '0')
				return numA - numB
			})

		return lineas as string[]
	}

	getColumnas() {
		return [
			{ key: 'dominio', label: 'Dominio', class: 'font-mono font-bold' },
			{ key: 'estado_vehiculo', label: 'Estado', pipe: 'titlecase' },
			{ key: 'tipo_vehiculo', label: 'Tipo', pipe: 'titlecase' },
			{ key: 'interno', label: 'Interno', class: 'font-bold' },
			{ key: 'numero_linea', label: 'Línea' },
		]
	}

	getVehiculoValue(vehiculo: Vehiculo, key: string): any {
		return vehiculo[key as keyof Vehiculo]
	}
}
