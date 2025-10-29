import { DatePipe, TitleCasePipe } from '@angular/common'
import { Component, computed, input, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgxPermissionsModule } from 'ngx-permissions'
import { DataTypes } from '../common/enums'

@Component({
	selector: 'lib-simple-list',
	imports: [DatePipe, TitleCasePipe, FormsModule, NgxPermissionsModule],
	templateUrl: './simple-list.component.html',
	styles: `
		i {
			font-size: 1rem;
		}
		:host ::ng-deep .input {
			&:focus,
			&:focus-within {
				outline: none;
			}
		}
	`,
})
export class SimpleListComponent {
	/**
	 * Ejemplo:
	 * [{key: 'usuarios.admin.nombre', type: DataTypes.STRING}]
	 */
	dataKeys = input.required<{ key: string; type: DataTypes; trueCase?: any }[]>()
	actions = input<
		{
			icon: string
			info: string
			action: (ele: any) => void
			condition?: (ele: any) => boolean
			disabled?: boolean
			disableCondition?: (ele: any) => boolean
		}[]
	>()
	globalActions = input<
		{
			icon: string
			info?: string
			action: () => void
			only: string
			label?: string
		}[]
	>()
	data = input.required<any[]>()
	headers = input.required<string[]>()
	showSearch = input<boolean>(false)
	showPagination = input<boolean>(false)
	pageSize = input<number>(10)
	onPageLimit = input<((page: number) => void) | null>(null)

	backgroundColor = input<string>()
	types = DataTypes
	searchTerm = signal('')
	currentPage = signal(1)

	filteredData = computed(() => {
		const term = this.searchTerm().toLowerCase().trim()
		if (!term) return this.data()

		return this.data().filter(item => {
			return this.dataKeys().some(dataKey => {
				const value = this.getValue(item, dataKey.key)
				return value?.toString().toLowerCase().includes(term)
			})
		})
	})

	paginatedData = computed(() => {
		if (!this.showPagination()) return this.filteredData()

		const startIndex = (this.currentPage() - 1) * this.pageSize()
		const endIndex = startIndex + this.pageSize()
		return this.filteredData().slice(startIndex, endIndex)
	})

	totalPages = computed(() => {
		if (!this.showPagination()) return 1
		return Math.ceil(this.filteredData().length / this.pageSize())
	})

	displayedCount = computed(() => {
		if (!this.showPagination()) return this.filteredData().length
		const startIndex = (this.currentPage() - 1) * this.pageSize()
		const endIndex = Math.min(
			startIndex + this.pageSize(),
			this.filteredData().length,
		)
		return endIndex - startIndex
	})

	startIndex = computed(() => {
		if (!this.showPagination() || this.filteredData().length === 0) return 0
		return (this.currentPage() - 1) * this.pageSize() + 1
	})

	endIndex = computed(() => {
		if (!this.showPagination()) return this.filteredData().length
		const startIdx = (this.currentPage() - 1) * this.pageSize()
		return Math.min(startIdx + this.pageSize(), this.filteredData().length)
	})

	getValue = (ele: any, key: string) => {
		const keys = key.split('.')
		let value = ele

		for (let idx = 0; idx < keys.length; idx++) {
			const currentKey = keys[idx]
			value = value[currentKey]
		}

		return value
	}

	sendEmail = (email: string) => (window.location.href = `mailto:${email}`)

	goToPage = (page: number) => {
		if (page >= 1 && page <= this.totalPages()) {
			this.currentPage.set(page)

			// Ejecutar callback si llegamos al límite
			if (page === this.totalPages() && this.onPageLimit()) {
				this.onPageLimit()!(page)
			}
		}
	}

	nextPage = () => this.goToPage(this.currentPage() + 1)
	prevPage = () => this.goToPage(this.currentPage() - 1)

	getVisiblePages = () => {
		const current = this.currentPage()
		const total = this.totalPages()
		const pages: number[] = []

		if (total <= 5) {
			for (let i = 1; i <= total; i++) {
				pages.push(i)
			}
		} else {
			if (current <= 3) {
				pages.push(1, 2, 3, 4, 5)
			} else if (current >= total - 2) {
				pages.push(total - 4, total - 3, total - 2, total - 1, total)
			} else {
				pages.push(current - 2, current - 1, current, current + 1, current + 2)
			}
		}

		return pages
	}
}
