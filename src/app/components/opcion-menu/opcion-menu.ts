import {Component, input, InputSignal} from '@angular/core';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-opcion-menu',
    imports: [TieredMenuModule],
    templateUrl: './opcion-menu.html',
})
export class OpcionMenu {
    opcionesRoutes: InputSignal<MenuItem[]> = input.required()
    titulo: InputSignal<string> = input.required()
}
