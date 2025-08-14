import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-seleccion-menu',
    imports: [],
    templateUrl: './seleccion-menu.html',
    host: {
        class: 'flex flex-col gap-5 w-[40rem] text-left'
    }
})
export class SeleccionMenu implements OnInit {
    seleccion = signal<string>('')
    items = signal<MenuItem[]>([])
    activatedRoute = inject(ActivatedRoute)

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.seleccion.set(data['seleccion'].label)
            this.items.set(data['seleccion'].items)
        })
    }
}
