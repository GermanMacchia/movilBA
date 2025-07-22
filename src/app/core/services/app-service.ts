import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    router = inject(Router);

    isDrawerOpen = signal<boolean>(true);

    switchDrawer = () => this.isDrawerOpen.update((value) => !value);

    previousUrl: string = '';
    currentUrl: string = '';

    constructor() {
        this.previousUrl = '/login';

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                pairwise()
            )
            .subscribe(([prev, curr]) => {
                if (prev.url.includes('login')) this.previousUrl = '/login';

                this.previousUrl = prev.url;
                this.currentUrl = curr.url;
            });
    }
}
