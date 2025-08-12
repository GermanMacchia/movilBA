import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuloMenu } from '@components';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-modulos',
    imports: [ModuloMenu],
    templateUrl: './modulos.html',
    host: {
        class: 'flex flex-col h-full gap-12 content-center justify-center'
    }
})
export class Modulos implements OnInit {
    private activatedRoute = inject(ActivatedRoute)
    modulos =  signal<MenuItem[]>([])

    ngOnInit(): void {
        this.activatedRoute.data.subscribe( data => this.modulos.set(data['modulos']) )
    }
}
