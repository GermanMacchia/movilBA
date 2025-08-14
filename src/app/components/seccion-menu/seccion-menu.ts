import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    secciones = input.required<MenuItem[]>()
}
