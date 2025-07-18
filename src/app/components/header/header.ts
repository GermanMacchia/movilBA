import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from '@src/app/core/interfaces/interfaces';
import { selectUsuario } from '@src/app/core/store/selectors';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header implements OnInit {
    activatedRoute = inject(ActivatedRoute);
    store = inject(Store);
    usuario = signal<Usuario | null>(null);
    ruta = signal<string>('');

    ngOnInit(): void {
        this.activatedRoute.url.subscribe(console.log);

        this.store.select(selectUsuario).subscribe(this.usuario.set);
    }
}
