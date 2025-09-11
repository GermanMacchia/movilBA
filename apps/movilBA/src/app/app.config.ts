import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthInterceptor, initializeApp, initializePermissions, LoginEffects } from 'data-access/src/index';
import {
  NgxPermissionsModule,
  NgxPermissionsService,
  USE_PERMISSIONS_STORE,
} from 'ngx-permissions';
import { appReducers } from './app.reducers';
import { appRoutes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    NgxPermissionsService,
    {
      provide: USE_PERMISSIONS_STORE,
      useValue: true,
    },
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(initializePermissions),
    provideAppInitializer(initializeApp),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideStore(appReducers),
    provideEffects([LoginEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ],
};
