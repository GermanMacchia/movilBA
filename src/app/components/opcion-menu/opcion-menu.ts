import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-opcion-menu',
    imports: [],
    templateUrl: './opcion-menu.html',

})
export class OpcionMenu {
    opcion = input.required<MenuItem>()
    router = inject(Router)

    navigate = (seleccionLabel: string) => this.router.navigate(['selecciones'], {
        state: {
            //va a header
            opcion: this.opcion().label!,
            label: seleccionLabel,
            items: this.opcion().items?.find(ele => ele.label === seleccionLabel)?.items
        }
    })
}
