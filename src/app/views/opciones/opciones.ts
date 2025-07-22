import {Component, inject, OnInit} from '@angular/core';

import {OpcionCard} from '@src/app/components/opcion-card/opcion-card';
import {MenuItem} from 'primeng/api';
import {Store} from '@ngrx/store';
import {selectOpciones} from '@src/app/core/store/selectors';

@Component({
    selector: 'app-opciones',
    imports: [OpcionCard],
    templateUrl: './opciones.html',
    styleUrl: './opciones.scss',
    host: {
        class: 'h-full m-16'
    }
})
export class Opciones implements OnInit{
    store$ = inject(Store)
    opciones: MenuItem[] = []

    ngOnInit() {
        this.store$.select(selectOpciones).subscribe(data => this.opciones = data)
    }
}
