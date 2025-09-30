import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Entidades, selectEntidades } from '@movil-ba/data-access';
import { SimpleListComponent } from '@movilBA/ui';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-entidades',
	imports: [SimpleListComponent, AsyncPipe],
	templateUrl: './entidades.component.html',
})
export class EntidadesComponent {
	store$ = inject(Store)
	//entidades
	data$: any = this.store$.select<Observable<Entidades>>(selectEntidades)
}
