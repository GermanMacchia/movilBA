import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeleccionMenu } from '@src/app/components/seleccion-menu/seleccion-menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-selecciones',
  imports: [SeleccionMenu],
  templateUrl: './selecciones.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Selecciones {
 private activatedRoute = inject(ActivatedRoute)
    seleccion =  signal<MenuItem | null>(null)

    ngOnInit(): void {
        this.activatedRoute.data.subscribe( data => this.seleccion.set(data['seleccion']) )
    }
}
