import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectModulos } from '@src/app/core/store/selectors';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-modulo-menu',
    imports: [RouterLink],
    templateUrl: './modulo-menu.html',
    host: {
        class: 'flex flex-wrap justify-center w-full gap-10'
    }
})
export class ModuloMenu implements OnInit {
    router = inject(Router)
    store$ = inject(Store)
    modulosRoutes = signal<MenuItem[]>([])

    ngOnInit() {
        this.store$.select(selectModulos).subscribe(this.modulosRoutes.set)
    }
}
