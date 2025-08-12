import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OpcionMenu } from '@components';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-opciones',
    imports: [OpcionMenu],
    templateUrl: './opciones.html',
    host: {
        class: 'flex flex-col h-full gap-12 content-center justify-center m-[3rem]'
    }
})
export class Opciones implements OnInit{
    private activatedRoute = inject(ActivatedRoute)
    opciones =  signal<MenuItem[]>([])

    ngOnInit(): void {
        this.activatedRoute.data.subscribe( data => this.opciones.set(data['opciones']) )
    }
}
