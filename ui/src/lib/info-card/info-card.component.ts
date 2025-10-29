import { Component, input } from '@angular/core'
import { CommonModule } from '@angular/common'

export interface InfoCardSection {
	icon?: string
	name: string
	content: string | number
	contentClass?: string
	type?: 'text' | 'badge' | 'stat'
	isPrimary?: boolean
}

export interface InfoCardData {
	title: string
	titleIcon?: string
	sections: InfoCardSection[]
	variant?: 'default' | 'stats' | 'minimal'
	layout?: 'vertical' | 'horizontal' | 'grid'
	gridCols?: 2 | 3 | 4
}

@Component({
	selector: 'lib-info-card',
	imports: [CommonModule],
	templateUrl: './info-card.component.html',
})
export class InfoCardComponent {
	data = input.required<InfoCardData>()

	getLayoutClasses(): string {
		const data = this.data()

		if (data.layout === 'grid') {
			const cols = data.gridCols || 2
			return `grid grid-cols-2 md:grid-cols-${cols} gap-4`
		}

		if (data.layout === 'horizontal') {
			return 'flex flex-wrap gap-4'
		}

		return 'space-y-3'
	}

	formatContent(section: InfoCardSection): string {
		return String(section.content || '')
	}
}
