import { Component, input, model } from '@angular/core'
import { NgxPermissionsModule } from 'ngx-permissions'

@Component({
	selector: 'lib-action-header',
	imports: [NgxPermissionsModule],
	templateUrl: './action-header.component.html',
	styles: `
		:host ::ng-deep .input {
			&:focus,
			&:focus-within {
				outline: none;
			}
		}
	`,
	host: {
		class: 'flex justify-between',
	},
})
export class ActionHeaderComponent {
	searchInput = model<any>()
	actions = input<
		{
			icon: string
			info?: string
			action: () => void
			only: string
			label?: string
		}[]
	>()
}
