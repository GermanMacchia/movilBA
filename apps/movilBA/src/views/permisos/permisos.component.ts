import { AsyncPipe } from '@angular/common'
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core'
import { Usuario } from '@movil-ba/data-access'
import {
	ActionHeaderComponent,
	FormModal,
	FormModalService,
	InfoModalService,
	SimpleListComponent,
	ToastService,
} from '@movilBA/ui'
import { Store } from '@ngrx/store'
import {
	createUsuario,
	deleteUsuario,
	restoreUsuario,
	selectModified,
	selectPemisosError,
	selectUsuarios,
	updateUsuario,
} from 'data-access/src/lib/store'
import { NgxPermissionsService } from 'ngx-permissions'
import { DataTypes } from 'ui/src/lib/common/enums'
import type { FormData } from 'ui/src/lib/common/interfaces'
import { PermisosModalComponent } from '../../components/permisos-modal/permisos-modal.component'
import { FormGroup } from '@angular/forms'
import { filter } from 'rxjs'

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
	infoModalService = inject(InfoModalService)
	toastService = inject(ToastService)
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
		this.subscribePermisosError()
		this.subscribePermisosModified()
	}

	private subscribePermisosModified() {
		this.store$
			.select(selectModified)
			.pipe(filter(ele => !!ele))
			.subscribe(data => {
				this.toastService.toast({
					body: data!,
					severity: 'success',
				})
			})
	}

	private subscribePermisosError() {
		this.store$
			.select(selectPemisosError)
			.pipe(filter(ele => !!ele))
			.subscribe(error => {
				this.toastService.toast({
					body: 'Error en permisos',
					severity: 'error',
				})
			})
	}

	openModalForm = () =>
		this.formModalService.openModal('Crear Usuario', formDefaultData, this.sendForm)

	setEdit = (usuario: Usuario) =>
		this.formModalService.openModal(
			'Editar Usuario',
			this.getDataValues(usuario),
			(formgroup: FormGroup) =>
				this.infoModalService.openAsConfirm(() =>
					this.store$.dispatch(
						updateUsuario({ ...formgroup.value, id: usuario.id }),
					),
				),
		)

	notDeleted = (ele: any) => !ele.deletedAt
	isDeleted = (ele: any) => ele.deletedAt

	getDataValues = (usuario: Usuario): FormData[] =>
		formDefaultData
			.filter(ele => ele.key !== 'clave')
			.map((ele: FormData) => ({
				...ele,
				value: (usuario as any)[ele.key],
			}))

	openPermissions = (usuario: Usuario) => {
		this.selectedUser.set(usuario)
		this.permisosModal.openModal()
	}

	sendForm = (formgroup: FormGroup) =>
		this.store$.dispatch(createUsuario({ ...formgroup.value }))

	setDelete = (usuario: Usuario) =>
		this.infoModalService.openAsConfirm(() =>
			this.store$.dispatch(deleteUsuario({ id: usuario.id })),
		)

	userRestore = (usuario: Usuario) =>
		this.infoModalService.openAsConfirm(() =>
			this.store$.dispatch(restoreUsuario({ id: usuario.id })),
		)
}
