import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastModule, NgxPermissionsModule],
    template: '<p-toast /><router-outlet></router-outlet>',
})
export class App {
    protected readonly title = signal('movilBA');
}
