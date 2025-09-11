import { Route } from '@angular/router'
import { LoginComponent } from '../views/login/login.component'
import { MainComponent } from '../views/main/main.component'
import { DisplayComponent } from '../views/display/display.component'
import { AppGuard, displayResolver, LoginGuard } from '@movil-ba/data-access'

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
		],
	},
	{ path: 'login', canActivate: [LoginGuard], component: LoginComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'login' },
]
