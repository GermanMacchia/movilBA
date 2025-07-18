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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

// ngrx
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducers } from '@src/app/app.reducers';

//primeng
import Aura from '@primeng/themes/aura';
import { initializeApp } from '@src/app/core/config/app-config.service';
import {
    initializePermissions,
    LoadPermissionsService,
} from '@src/app/core/config/load-permissions.service';
import { AuthInterceptor } from '@src/app/core/interceptors/auth.interceptor';
import { LoginEffects } from '@src/app/core/store';
import {
    NgxPermissionsModule,
    NgxPermissionsService,
    USE_PERMISSIONS_STORE,
} from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        LoadPermissionsService,
        MessageService,
        NgxPermissionsService,
        {
            provide: USE_PERMISSIONS_STORE,
            useValue: true,
        },
        provideAppInitializer(initializeApp),
        provideAppInitializer(initializePermissions),
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxPermissionsModule.forRoot()),
        provideRouter(
            routes,
            withInMemoryScrolling({ scrollPositionRestoration: 'top' })
        ),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        provideStore(appReducers),
        provideEffects([LoginEffects]),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: false,
        }),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark',
                },
            },
        }),
    ],
};
