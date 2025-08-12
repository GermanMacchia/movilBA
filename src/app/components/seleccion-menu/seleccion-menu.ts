import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-seleccion-menu',
  imports: [],
  templateUrl: './seleccion-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeleccionMenu{
    seleccion = input.required<MenuItem>()
 }
