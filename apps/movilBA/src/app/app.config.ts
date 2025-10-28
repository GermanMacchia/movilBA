import {
	HTTP_INTERCEPTORS,
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http'
import {
	ApplicationConfig,
	importProvidersFrom,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import {
	authSetDataOnReload,
	AuthInterceptor,
	initializeApp,
	LoginEffects,
	RutapEffects,
} from 'data-access/src/index'
import { PermisosEffects } from 'data-access/src/lib/store'
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions'
import { appReducers } from './app.reducers'
import { appRoutes } from './app.routes'

export const appConfig: ApplicationConfig = {
	providers: [
		NgxPermissionsService,
		provideBrowserGlobalErrorListeners(),
		provideAppInitializer(initializeApp),
		provideAppInitializer(authSetDataOnReload),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		importProvidersFrom(NgxPermissionsModule.forRoot()),
		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		provideStore(appReducers),
		provideEffects([LoginEffects, RutapEffects, PermisosEffects]),
		provideStoreDevtools({
			maxAge: 25,
			logOnly: false,
		}),
	],
}
