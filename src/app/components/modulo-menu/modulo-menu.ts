import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-modulo-menu',
    imports: [RouterLink],
    templateUrl: './modulo-menu.html',
    host: {
        class: 'flex flex-wrap justify-center w-full gap-10'
    }
})
export class ModuloMenu  {
    router = inject(Router)
    modulosRoutes  = input.required<MenuItem[]>()
}
