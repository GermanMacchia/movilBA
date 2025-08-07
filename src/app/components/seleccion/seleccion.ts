import { Component, input } from '@angular/core';

@Component({
    selector: 'app-seleccion',
    imports: [],
    templateUrl: './seleccion.html',
    host:{
        class:'w-2/5'
    }

})
export class Seleccion {
    item = input.required<any>()
 }
