import { Route } from '@angular/router'
import {
	ACCIONES,
	AppGuard,
	displayResolver,
	entidadesResolver,
	LoginGuard,
	MODULOS,
	permisosResolver,
} from '@movil-ba/data-access'
import { ngxPermissionsGuard } from 'ngx-permissions'
import { DisplayComponent } from '../views/display/display.component'
import { LoginComponent } from '../views/login/login.component'
import { MainComponent } from '../views/main/main.component'
import { PermisosComponent } from '../views/permisos/permisos.component'
import { EntidadesComponent } from '../views/rutap/entidades/entidades.component'

export const appRoutes: Route[] = [
	{
		path: '',
		canActivate: [AppGuard],
		component: MainComponent,
		children: [
			{
				path: '',
				resolve: {
					modulos: displayResolver,
				},
				component: DisplayComponent,
			},
			{
				path: 'rutap',
				canActivate: [ngxPermissionsGuard],
				data: {
					permissions: {
						only: `${MODULOS.rutap}.${ACCIONES.read}`
					},
				},
				loadChildren: () => rutapRoutes,
			},
			{
				path: 'permisos',
				canActivate: [ngxPermissionsGuard],
				data: {
					permissions: {
						only: `${MODULOS.permisos}.${ACCIONES.read}`
					},
				},
				loadChildren: () => permisosRoutes,
			},
		],
	},
	{ path: 'login', canActivate: [LoginGuard], component: LoginComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'login' },
]

const rutapRoutes: Route[] = [
	{
		path: '',
		resolve: {
			modulos: entidadesResolver,
		},
		component: EntidadesComponent,
	},
]

const permisosRoutes: Route[] = [
	{
		path: '',
		resolve: {
			modulos: permisosResolver,
		},
		component: PermisosComponent,
	},
]
