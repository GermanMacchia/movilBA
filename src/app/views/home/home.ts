import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar, Header} from '@components';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-home',
    imports: [RouterOutlet, Header, Sidebar],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class Home {


}
