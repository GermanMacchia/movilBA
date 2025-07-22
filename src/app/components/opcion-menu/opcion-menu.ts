import {Component, input, InputSignal} from '@angular/core';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-opcion-menu',
    imports: [TieredMenuModule],
    templateUrl: './opcion-menu.html',
    host: {
        class: 'w-full flex flex-col justify-center items-center gap-2'
    }
})
export class OpcionMenu {
    opcionesRoutes: InputSignal<MenuItem[]> = input.required()
}
