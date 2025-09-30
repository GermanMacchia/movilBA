import { Route } from '@angular/router'
import {
	AppGuard,
	displayResolver,
	entidadesResolver,
	LoginGuard,
} from '@movil-ba/data-access'
import { DisplayComponent } from '../views/display/display.component'
import { LoginComponent } from '../views/login/login.component'
import { MainComponent } from '../views/main/main.component'
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
				loadChildren: () => rutapRoutes,
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
