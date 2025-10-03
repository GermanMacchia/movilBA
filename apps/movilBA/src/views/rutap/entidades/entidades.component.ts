import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { selectEntidades } from '@movil-ba/data-access';
import { SimpleListComponent, SimpleListType } from '@movilBA/ui';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-entidades',
	imports: [SimpleListComponent, AsyncPipe],
	templateUrl: './entidades.component.html',
})
export class EntidadesComponent {
	store$ = inject(Store)
	types = SimpleListType
	data$: any = this.store$.select(selectEntidades)
}
