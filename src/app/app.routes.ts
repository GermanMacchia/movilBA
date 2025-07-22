import {Routes} from '@angular/router';
import {AppGuard} from '@src/app/core/guards/auth.guard';
import {LoginGuard} from '@src/app/core/guards/login.guard';
import {Modulos,Login, Home, Secciones, Opciones} from '@src/app/views';


export const routes: Routes = [
    {path: 'login', canActivate: [LoginGuard], component: Login},
    {path: '', canActivate: [AppGuard], loadChildren: () => homeRoutes},
    {path: '**', pathMatch: 'full', redirectTo: 'login'},
];

export const homeRoutes: Routes = [
    {
        path: '',
        component: Home,
        children: [
            {path: 'modulos', component: Modulos},
            {path: 'secciones', component: Secciones},
            {path: 'opciones', component: Opciones},
            {path: '**', redirectTo: 'modulos'},
        ],
    },
    {path: '**', pathMatch: 'full', redirectTo: ''},
];
