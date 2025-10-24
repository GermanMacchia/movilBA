import { TitleCasePipe } from '@angular/common'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	inject,
	input,
	OnChanges,
	signal,
	SimpleChanges,
	ViewChild,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Modulo, Usuario } from '@movil-ba/data-access'
import { InfoModalService, ToastService } from '@movilBA/ui'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import {
	createPermission,
	deletePermission,
	selectModulos,
} from 'data-access/src/lib/store'
import { NgxPermissionsModule } from 'ngx-permissions'
import { filter } from 'rxjs'

@UntilDestroy()
@Component({
	selector: 'app-permisos-modal',
	imports: [TitleCasePipe, NgxPermissionsModule, FormsModule],
	templateUrl: './permisos-modal.component.html',
	styleUrl: './permisos-modal.component.scss',
})
export class PermisosModalComponent {
	store$ = inject(Store)
	selectedUser = input<Usuario>()
	infoModalService = inject(InfoModalService)

	warning = signal<boolean>(false)

	@ViewChild('permisos')
	permisos!: ElementRef<HTMLDialogElement>
	editMode = signal<boolean>(false)
	modulos = signal<Modulo[]>([])

	modulo_id = signal<number>(0)
	bits = signal<number>(0)

	inputChange = (idx: number, event: any) =>
		this.toggleBit(idx, event.target.checked)

	selectChange = (event: any) => {
		this.modulo_id.set(+event.target.value)
	}

	deletePermiso = (permiso_id: number) => {
		this.infoModalService.openAsConfirm(() => {
			this.store$.dispatch(deletePermission({ id: permiso_id }))
		})
	}

	createPermiso = () => {
		if (!this.modulo_id() || !this.bits()) {
			this.warning.set(true)
			return
		}

		this.warning.set(false)
		this.infoModalService.openAsConfirm(() => {
			this.store$.dispatch(
				createPermission({
					usuario_id: this.selectedUser()!.id,
					modulo_id: +this.modulo_id(),
					permisos: this.bits().toString(2).padStart(4, '0'),
				}),
			)

			this.modulo_id.set(0)
			this.bits.set(0)
		})
	}

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
		this.cancel()
	}

	split = (permisos: string) => permisos.split('')

	cancel = () => {
		this.editMode.set(false)
		this.warning.set(false)
		this.modulo_id.set(0)
		this.bits.set(0)
	}
}
