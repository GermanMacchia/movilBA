import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Store} from '@ngrx/store';
import {selectModulos} from '@src/app/core/store/selectors';

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
    modulosRoutes: MenuItem[] = []

    ngOnInit() {
        this.store$.select(selectModulos).subscribe(data => this.modulosRoutes = data)
    }
}
