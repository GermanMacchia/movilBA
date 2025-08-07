import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSecciones } from '@src/app/core/store/selectors';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-seccion-menu',
    imports: [RouterLink],
    templateUrl: './seccion-menu.html',
    host: {
        class: 'flex flex-col justify-center items-center w-full gap-10'
    }
})
export class SeccionMenu {
    store$ = inject(Store)
    seccionesRoutes =  signal<MenuItem[]>([])

    ngOnInit() {
        this.store$.select(selectSecciones).subscribe(this.seccionesRoutes.set)
    }
}
