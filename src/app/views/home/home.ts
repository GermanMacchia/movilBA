import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header, Sidebar} from '@components';
import {AppService} from '@src/app/core/services/app-service';
import {Location} from '@angular/common';


@Component({
    selector: 'app-home',
    imports: [RouterOutlet, Header, Sidebar],
    templateUrl: './home.html',
    host: {
        class: 'text-center',
    }
})
export class Home {
    appService = inject(AppService)
    location = inject(Location)
}
