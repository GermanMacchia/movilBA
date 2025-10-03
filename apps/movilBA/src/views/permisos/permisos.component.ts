import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SimpleListComponent, SimpleListType } from '@movilBA/ui';
import { Store } from '@ngrx/store';
import { selectUsuarios } from 'data-access/src/lib/store';

@Component({
  selector: 'app-permisos',
  imports: [SimpleListComponent, AsyncPipe],
  templateUrl: './permisos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermisosComponent {
  store$ = inject(Store)
  types = SimpleListType
  data$: any = this.store$.select(selectUsuarios)
}
