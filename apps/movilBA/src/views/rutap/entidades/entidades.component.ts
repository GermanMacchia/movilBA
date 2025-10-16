import { AsyncPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
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
	types = DataTypes
	data$: any = this.store$.select(selectEntidades)
}
