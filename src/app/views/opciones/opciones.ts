import { Component } from '@angular/core';

import { OpcionMenu } from '@components';

@Component({
    selector: 'app-opciones',
    imports: [OpcionMenu],
    templateUrl: './opciones.html',
    host: {
        class: 'flex flex-col h-full gap-12 content-center justify-center'
    }
})
export class Opciones {}
