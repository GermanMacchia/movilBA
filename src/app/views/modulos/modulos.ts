import {Component} from '@angular/core';
import {ModuloMenu} from '@components';

@Component({
    selector: 'app-modulos',
    imports: [ModuloMenu],
    templateUrl: './modulos.html',
    host: {
        class: 'flex flex-col h-full gap-12 content-center justify-center'
    }
})
export class Modulos {}
