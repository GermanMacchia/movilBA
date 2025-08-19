import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeccionMenu } from '@components';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-secciones',
    imports: [SeccionMenu],
    templateUrl: './secciones.html',
    host: {
        class: 'flex flex-col gap-12'
    }
})
export class Secciones implements OnInit {
    private activatedRoute = inject(ActivatedRoute)
    secciones = signal<MenuItem[]>([])

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => this.secciones.set(data['secciones']))
    }
}
