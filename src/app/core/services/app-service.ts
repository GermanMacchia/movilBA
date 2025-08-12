import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    router = inject(Router);

    isDrawerOpen = signal<boolean>(true);

    switchDrawer = () => this.isDrawerOpen.update((value) => !value);

    previousUrl: string = '';
    currentUrl: string = '/login';

    constructor() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((curr) => {
                this.previousUrl = this.currentUrl;
                this.currentUrl = curr.url;
            });
    }
}
