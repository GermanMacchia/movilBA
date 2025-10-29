import { Component, input, output } from '@angular/core'

export interface LineaCardData {
	numero_linea: string | number
	color_linea?: string
	ramales_count?: number
	detalles?: {
		ramales?: any[]
	}
}

@Component({
	selector: 'app-linea-card',
	templateUrl: './linea-card.component.html',
	styles: `
		.linea-card {
			transition: all 0.2s ease-in-out;
		}
		.linea-card:hover {
			transform: translateY(-2px);
		}
	`,
})
export class LineaCardComponent {
	linea = input.required<LineaCardData>()

	onCardClick = output<LineaCardData>()
	onViewDetails = output<LineaCardData>()

	getRamalesCount(): number {
		return this.linea().detalles?.ramales?.length || 0
	}

	getLineaColor(): string {
		return this.linea().color_linea || '#6B7280'
	}

	handleCardClick() {
		this.onCardClick.emit(this.linea())
	}

	handleViewDetails(event: Event) {
		event.stopPropagation()
		this.onViewDetails.emit(this.linea())
	}
}
