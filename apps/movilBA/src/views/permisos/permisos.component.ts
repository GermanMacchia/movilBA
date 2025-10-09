import { AsyncPipe } from '@angular/common'
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core'
import { Usuario } from '@movil-ba/data-access'
import {
	ActionHeaderComponent,
	FormModal,
	FormModalService,
	SimpleListComponent,
} from '@movilBA/ui'
import { Store } from '@ngrx/store'
import { createUsuario, selectUsuarios } from 'data-access/src/lib/store'
import { NgxPermissionsService } from 'ngx-permissions'
import { DataTypes } from 'ui/src/lib/common/enums'
import type { FormData } from 'ui/src/lib/common/interfaces'
import { PermisosModalComponent } from '../../components/permisos-modal/permisos-modal.component'

const formDefaultData: FormData[] = [
	{ key: 'cuil', type: DataTypes.STRING, value: '' },
	{ key: 'email', type: DataTypes.EMAIL, value: '' },
	{ key: 'nombre', type: DataTypes.STRING, value: '' },
	{ key: 'clave', type: DataTypes.PASSWORD, value: '' },
]

@Component({
	selector: 'app-permisos',
	imports: [
		SimpleListComponent,
		AsyncPipe,
		ActionHeaderComponent,
		FormModal,
		PermisosModalComponent,
	],
	templateUrl: './permisos.component.html',
	styles: `
		table {
			width: 100%;
			th,
			td {
				border-collapse: collapse;
				border: 1px solid black;
				text-align: center;
			}
		}
	`,
})
export class PermisosComponent implements OnInit {
	formModalService = inject(FormModalService)
	permissionsService = inject(NgxPermissionsService)
	store$ = inject(Store)
	types = DataTypes
	data$: any = this.store$.select(selectUsuarios)
	canEdit = signal<boolean>(false)

	@ViewChild(PermisosModalComponent)
	permisosModal!: PermisosModalComponent

	selectedUser = signal<Usuario | null>(null)

	async ngOnInit() {
		const canEdit = await this.permissionsService.hasPermission('PERMISOS.CREATE')

		this.canEdit.set(canEdit)
	}

	openModalForm = () =>
		this.formModalService.openModal(
			'Crear Usuario',
			formDefaultData,
			this.sendForm,
			this.cancel,
		)

	openPermissions = (usuario: Usuario) => {
		this.selectedUser.set(usuario)
		this.permisosModal.openModal()
	}

	sendForm = () =>
		this.store$.dispatch(
			createUsuario({ ...this.formModalService.formgroup?.value }),
		)

	cancel = () => {}
}
