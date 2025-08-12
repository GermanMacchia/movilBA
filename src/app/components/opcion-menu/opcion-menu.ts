import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-opcion-menu',
    imports: [],
    templateUrl: './opcion-menu.html',
    host:{
        class:'p-3'
    }
})
export class OpcionMenu {
    opcion = input.required<MenuItem>()
}
