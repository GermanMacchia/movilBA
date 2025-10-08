import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Permiso, Usuario } from '@movil-ba/data-access';
import { ActionHeaderComponent, FormModal, FormModalService, SimpleListComponent } from '@movilBA/ui';
import { Store } from '@ngrx/store';
import { selectUsuarios } from 'data-access/src/lib/store';
import { DataTypes } from 'ui/src/lib/common/enums';
import type { FormData } from 'ui/src/lib/common/interfaces';

const formDefaultData: FormData[] = [
  { key: 'cuil', type: DataTypes.STRING, value: '' },
  { key: 'email', type: DataTypes.EMAIL, value: '' },
  { key: 'nombre', type: DataTypes.STRING, value: '' },
  { key: 'clave', type: DataTypes.PASSWORD, value: '' },
]

@Component({
  selector: 'app-permisos',
  imports: [SimpleListComponent, AsyncPipe, ActionHeaderComponent, FormModal, TitleCasePipe],
  templateUrl: './permisos.component.html',
  styles: `
    table{ 
    width: 100%;
    th, td {
        border-collapse: collapse;
        border: 1px solid black;
        text-align: center;
      }
    }
 `
})
export class PermisosComponent {
  @ViewChild('permisos')
  permisos!: ElementRef<HTMLDialogElement>
  formModalService = inject(FormModalService)
  store$ = inject(Store)
  types = DataTypes
  data$: any = this.store$.select(selectUsuarios)

  selectedUserPermissions = signal<Permiso[]>([])
  selectedUser = signal<Usuario | null>(null)

  openModalForm = () =>
    this.formModalService.openModal('Crear Usuario', formDefaultData, this.sendForm, this.cancel)

  openPermissions = (usuario: Usuario) => {
    this.selectedUser.set(usuario)
    this.selectedUserPermissions.set(usuario.permisos)
    this.permisos.nativeElement.showModal()
  }

  sendForm = () => { }

  split = (permisos: string) => permisos.split('')

  cancel = () => { }

}
