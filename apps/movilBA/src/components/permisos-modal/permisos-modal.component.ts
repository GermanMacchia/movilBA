import { TitleCasePipe } from '@angular/common'
import {
	Component,
	ElementRef,
	inject,
	input,
	signal,
	ViewChild,
} from '@angular/core'
import { Modulo, Usuario } from '@movil-ba/data-access'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { createPermission, selectModulos } from 'data-access/src/lib/store'
import { NgxPermissionsModule } from 'ngx-permissions'
import { filter } from 'rxjs'

@UntilDestroy()
@Component({
	selector: 'app-permisos-modal',
	imports: [TitleCasePipe, NgxPermissionsModule],
	templateUrl: './permisos-modal.component.html',
	styleUrl: './permisos-modal.component.scss',
})
export class PermisosModalComponent {
	store$ = inject(Store)
	selectedUser = input<Usuario>()

	@ViewChild('permisos')
	permisos!: ElementRef<HTMLDialogElement>

	editMode = signal<boolean>(false)
	modulos = signal<Modulo[]>([])

	modulo_id = signal(0)
	bits = signal(0)

	inputChange = (idx: number, event: any) =>
		this.toggleBit(idx, event.target.checked)

	selectChange = (event: any) => {
		this.modulo_id.set(event.target.value)
	}

	crearPermiso = () =>
		this.store$.dispatch(
			createPermission({
				usuario_id: this.selectedUser()!.id,
				modulo_id: +this.modulo_id(),
				permisos: this.bits().toString(2).padStart(4, '0'),
			}),
		)

	// Función para prender/apagar un bit
	toggleBit(position: number, on: boolean) {
		if (position < 0 || position > 3) return

		// Convertir posición de MSB a LSB
		const mask = 1 << (3 - position)

		if (on)
			this.bits.set(this.bits() | mask) // prender bit
		else this.bits.set(this.bits() & ~mask) // apagar bit
	}

	constructor() {
		this.store$
			.select(selectModulos)
			.pipe(
				filter(ele => !!ele),
				untilDestroyed(this),
			)
			.subscribe(this.modulos.set)
	}

	openModal = () => this.permisos.nativeElement.showModal()
	closeModal = () => {
		this.permisos.nativeElement.close()
		this.editMode.set(false)
	}
	split = (permisos: string) => permisos.split('')
}
