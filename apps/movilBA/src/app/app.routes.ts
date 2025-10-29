import { Route } from '@angular/router'
import {
	ACCIONES,
	AppGuard,
	displayResolver,
	empresasResolver,
	entidadesResolver,
	LoginGuard,
	logsResolver,
	MODULOS,
	permisosResolver,
} from '@movil-ba/data-access'
import { ngxPermissionsGuard } from 'ngx-permissions'
import { DisplayComponent } from '../views/display/display.component'
import { LoginComponent } from '../views/login/login.component'
import { LogsComponent } from '../views/logs/logs.component'
import { MainComponent } from '../views/main/main.component'
import { PermisosComponent } from '../views/permisos/permisos.component'
import { EntidadesComponent } from '../views/rutap/entidades/entidades.component'
import { EntidadComponent } from '../views/rutap/entidad/entidad.component'
import { ErrorComponent } from '../views/error/error.component'

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
						only: `${MODULOS.rutap}.${ACCIONES.read}`,
					},
				},
				loadChildren: () => rutapRoutes,
			},
			{
				path: 'permisos',
				canActivate: [ngxPermissionsGuard],
				data: {
					permissions: {
						only: `${MODULOS.permisos}.${ACCIONES.read}`,
					},
				},
				loadChildren: () => permisosRoutes,
			},
			{
				path: 'logs',
				canActivate: [ngxPermissionsGuard],
				data: {
					permissions: {
						only: `${MODULOS.permisos}.${ACCIONES.read}`,
					},
				},
				loadChildren: () => logsRoutes,
			},
		],
	},
	{ path: 'login', canActivate: [LoginGuard], component: LoginComponent },
	{ path: 'error', component: ErrorComponent },
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
	{
		path: 'entidad/:id',
		component: EntidadComponent,
		resolve: {
			modulos: empresasResolver,
		},
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

const logsRoutes: Route[] = [
	{
		path: '',
		resolve: {
			logs: logsResolver,
		},
		component: LogsComponent,
	},
]
