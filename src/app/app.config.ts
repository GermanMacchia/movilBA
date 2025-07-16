import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http'
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'

// ngrx
import {provideEffects} from '@ngrx/effects'
import {provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'

//primeng
import Aura from '@primeng/themes/aura'
import {providePrimeNG} from 'primeng/config'

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'top'})),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        provideStore(),
        provideEffects(),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: false,
        }),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark',
                }
            }
        }),
    ]
};
