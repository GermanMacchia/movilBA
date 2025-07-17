import {
    APP_INITIALIZER,
    ApplicationConfig, importProvidersFrom, provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection
} from '@angular/core';
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
import {appReducers} from '@src/app/app.reducers';

//primeng
import Aura from '@primeng/themes/aura'
import {providePrimeNG} from 'primeng/config'
import {initializeApp} from '@src/app/core/config/app-config.service';
import {AuthInterceptor} from '@src/app/core/interceptors/auth.interceptor';
import {initializePermissions, LoadPermissionsService} from '@src/app/core/config/load-permissions.service';
import {NgxPermissionsModule, NgxPermissionsService, USE_PERMISSIONS_STORE} from 'ngx-permissions';
import {MessageService} from 'primeng/api';
import {LoginEffects} from '@src/app/core/store';


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
            useValue: true
        },
        provideAppInitializer(initializeApp),
        provideAppInitializer(initializePermissions),
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxPermissionsModule.forRoot()),
        provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'top'})),
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
                }
            }
        }),
    ]
}
