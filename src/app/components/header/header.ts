import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from '@src/app/core/interfaces/interfaces';
import { AppService } from '@src/app/core/services/app-service';
import { selectUsuario } from '@src/app/core/store/selectors';
import { filter, take } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
})
export class Header implements OnInit {
    route = inject(Router);
    appService = inject(AppService);
    store$ = inject(Store);
    usuario = signal<Usuario | null>(null);
    ruta = signal<string>('');

    ngOnInit(): void {
        this.ruta.set(this.route.url.toUpperCase().replace('/', ''));

        this.store$
            .select(selectUsuario)
            .pipe(take(1))
            .subscribe(this.usuario.set);

        this.subscribeRoute();
    }

    subscribeRoute() {
        this.route.events
            .pipe(
                filter(
                    (event): event is NavigationEnd =>
                        event instanceof NavigationEnd
                )
            )
            .subscribe((event) =>
                event.url !== '/'
                    ? this.ruta.set(event.url?.toUpperCase().replace('/', ''))
                    : null
            );
    }
}
