import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeleccionDate } from '@src/app/components/seleccion-date/seleccion-date';
import { SeleccionMenu } from '@src/app/components/seleccion-menu/seleccion-menu';
import { tipoVista } from '@src/app/core/interfaces/enums';

@Component({
    selector: 'app-selecciones',
    imports: [SeleccionMenu, SeleccionDate],
    templateUrl: './selecciones.html',
    host: {
        class: 'flex flex-col justify-center mt-[4rem] mx-[4rem]',
    }
})
export class Selecciones {
    private activatedRoute = inject(ActivatedRoute)
    tipos = tipoVista
    vista = signal<tipoVista>(tipoVista.LISTA)

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.vista.set(data['seleccion'].vista)
        })
    }
}
