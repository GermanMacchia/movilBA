import { AsyncPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { selectEntidades } from '@movil-ba/data-access'
import { SimpleListComponent } from '@movilBA/ui'
import { Store } from '@ngrx/store'
import { DataTypes } from 'ui/src/lib/common/enums'

@Component({
	selector: 'app-entidades',
	imports: [SimpleListComponent, AsyncPipe],
	templateUrl: './entidades.component.html',
})
export class EntidadesComponent {
	store$ = inject(Store)
	router = inject(Router)
	types = DataTypes
	data$: any = this.store$.select(selectEntidades)

	actions = [
		{
			icon: 'bi bi-info-circle',
			info: 'Ver información',
			action: (entidad: any) => this.router.navigate(['/rutap/entidad', entidad.id]),
		},
	]
}
