import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOpciones } from '@src/app/core/store/selectors';
import { MenuItem } from 'primeng/api';
import { Seleccion } from "../seleccion/seleccion";

@Component({
    selector: 'app-opcion-menu',
    imports: [Seleccion],
    templateUrl: './opcion-menu.html',
    host: {
        class: 'flex flex-wrap justify-center w-full gap-10'
    }
})
export class OpcionMenu implements OnInit {
    store$ = inject(Store)
    opciones = signal<MenuItem[]>([])

    ngOnInit() {
        this.store$.select(selectOpciones).subscribe(this.opciones.set)
    }

}
