import { Routes } from '@angular/router';
import { AppGuard } from '@src/app/core/guards/auth.guard';
import { LoginGuard } from '@src/app/core/guards/login.guard';
import { Home, Login, Modulos, Opciones, Secciones } from '@src/app/views';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { RolesUsuarios } from './core/interfaces/enums';

export const routes: Routes = [
    { path: 'login', canActivate: [LoginGuard], component: Login },
    { path: '', canActivate: [AppGuard], loadChildren: () => homeRoutes },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

export const homeRoutes: Routes = [
    {
        path: '',
        component: Home,
        children: [
            {
                path: 'modulos',
                canActivate: [ngxPermissionsGuard],
                data: {
                    permissions: {
                        only: [
                            RolesUsuarios.ADMINISTRADOR,
                            RolesUsuarios.AUDITOR,
                        ],
                    },
                },
                component: Modulos,
            },
            {
                path: 'secciones',
                canActivate: [ngxPermissionsGuard],
                data: {
                    permissions: {
                        only: [
                            RolesUsuarios.ADMINISTRADOR,
                            RolesUsuarios.AUDITOR,
                        ],
                    },
                },
                component: Secciones,
            },
            { path: 'opciones', component: Opciones },
            { path: '**', redirectTo: 'modulos' },
        ],
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
