import { AsyncPipe, TitleCasePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { selectEntidades } from '@movil-ba/data-access'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

@Component({
	selector: 'app-entidad',
	imports: [AsyncPipe, TitleCasePipe],
	templateUrl: './entidad.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntidadComponent implements OnInit {
	store$ = inject(Store)
	route = inject(ActivatedRoute)

	entidad$ = this.store$.select(selectEntidades).pipe(
		map(entidades => {
			const id = Number(this.route.snapshot.paramMap.get('id'))
			return entidades?.find((e: any) => e.id === id)
		}),
	)

	getCorreoInfo(correo: any): {
		email: string
		tipo: string
		primario: boolean
		observaciones?: string
	} {
		if (typeof correo === 'string') {
			return { email: correo, tipo: '', primario: false }
		}
		return {
			email: correo?.correo || correo?.email || '',
			tipo: correo?.tipo_correo || '',
			primario: correo?.es_primario || false,
			observaciones: correo?.observaciones || '',
		}
	}

	getTelefonoInfo(telefono: any): {
		numero: string
		tipo?: string
		primario?: boolean
		observaciones?: string
	} {
		if (typeof telefono === 'string') {
			return { numero: telefono }
		}
		return {
			numero: telefono?.numero || telefono?.telefono || '',
			tipo: telefono?.tipo_telefono || '',
			primario: telefono?.es_primario || false,
			observaciones: telefono?.observaciones || '',
		}
	}

	ngOnInit() {}
}
