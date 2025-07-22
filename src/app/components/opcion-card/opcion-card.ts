import {Component, input, InputSignal} from '@angular/core';
import {OpcionMenu} from '@components';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-opcion-card',
    imports: [OpcionMenu],
    templateUrl: './opcion-card.html',
    styleUrl: './opcion-card.scss',
    host: {
        class: 'w-full'
    }
})
export class OpcionCard {
    titulo: InputSignal<string> = input.required()
    menuLinks: InputSignal<MenuItem[]> = input.required()
}
