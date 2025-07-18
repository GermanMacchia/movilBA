import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Sidebar } from '@components';

@Component({
    selector: 'app-home',
    imports: [RouterOutlet, Header, Sidebar],
    templateUrl: './home.html',
    styleUrl: './home.scss',
    host: {
        class: 'h-screen',
    },
})
export class Home {}
