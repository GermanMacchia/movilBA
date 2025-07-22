import {Component} from '@angular/core';
import {SeccionMenu} from '@components';

@Component({
    selector: 'app-secciones',
    imports: [SeccionMenu],
    templateUrl: './secciones.html',
    host: {
        class: 'flex flex-col h-full gap-12 content-center justify-center'
    }
})
export class Secciones {}
