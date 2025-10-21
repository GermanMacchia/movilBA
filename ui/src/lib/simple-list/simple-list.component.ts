import { DatePipe, TitleCasePipe } from '@angular/common'
import { Component, input } from '@angular/core'
import { DataTypes } from '../common/enums'

@Component({
	selector: 'lib-simple-list',
	imports: [DatePipe, TitleCasePipe],
	templateUrl: './simple-list.component.html',
	styles: `
		i {
			font-size: 1rem;
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
	data = input.required<any[]>()
	headers = input.required<string[]>()
	types = DataTypes

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
}
