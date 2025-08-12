import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastModule, NgxPermissionsModule],
    template: `
        <p-toast />
        <div class="app-container">
            <router-outlet></router-outlet>
        </div>
    `,
})
export class App {
    protected readonly title = signal('movilBA');
}
