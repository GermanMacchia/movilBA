import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import {
    ApplicationConfig,
    importProvidersFrom,
    provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

// ngrx
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducers } from '@src/app/app.reducers';

//primeng
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeng/themes/aura';
import { initializeApp } from '@src/app/core/config/app-config.service';
import { AuthInterceptor } from '@src/app/core/interceptors/auth.interceptor';
import { DataEffects, LoginEffects } from '@src/app/core/store';
import {
    NgxPermissionsModule,
    NgxPermissionsService,
    USE_PERMISSIONS_STORE,
} from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { initializePermissions } from './core/config/load-permissions.service';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        MessageService,
        NgxPermissionsService,
        {
            provide: USE_PERMISSIONS_STORE,
            useValue: true,
        },
        provideAppInitializer(initializePermissions),
        provideAppInitializer(initializeApp),
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxPermissionsModule.forRoot()),
        provideRouter(
            routes,
            withInMemoryScrolling({ scrollPositionRestoration: 'top' })
        ),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideStore(appReducers),
        provideEffects([LoginEffects, DataEffects]),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: false,
        }),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark',
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities',
                    },
                },
            },
            translation: {
                dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
                monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                today: 'Hoy',
                clear: 'Limpiar',
                weekHeader: 'Sm',        // opcional, si lo usás
                firstDayOfWeek: 1         // lunes como primer día de la semana
            }
        }),
    ],
};
