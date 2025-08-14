import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import type { Usuario } from '@interfaces';
import { Store } from '@ngrx/store';
import { AppService } from '@src/app/core/services/app-service';
import { selectUsuario } from '@src/app/core/store/selectors';
import { filter, take } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
})
export class Header implements OnInit {
    router = inject(Router);
    appService = inject(AppService);
    store$ = inject(Store);
    usuario = signal<Usuario | null>(null);
    ruta = signal<string>('');
    state = signal<string>('')

    ngOnInit(): void {
        this.ruta.set(this.router.url.toUpperCase().replace('/', ''));

        this.store$
            .select(selectUsuario)
            .pipe(take(1))
            .subscribe(this.usuario.set);

        this.subscribeRoute();
    }

    subscribeRoute() {
        this.router.events
            .pipe(
                filter(
                    (event): event is NavigationEnd =>
                        event instanceof NavigationEnd
                )
            )
            .subscribe((event) => {
                this.checkForState()
                event.url !== '/'
                    ? this.ruta.set(event.url?.toUpperCase().replace('/', ''))
                    : null
            });
    }

    //opciones
    private checkForState() {
        const state = this.router.getCurrentNavigation()?.extras.state
        if (!state) {
            this.state.set('')
            return
        }

        this.state.set(state['opcion'].toUpperCase())
    }
}
