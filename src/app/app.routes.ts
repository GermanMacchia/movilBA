import { Routes } from '@angular/router';
import { modulosResolver, opcionesResolver, seccionesResolver, seleccionesResolver } from '@resolvers';
import { AppGuard } from '@src/app/core/guards/auth.guard';
import { LoginGuard } from '@src/app/core/guards/login.guard';
import { Home, Login, Modulos, Opciones, Secciones } from '@src/app/views';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { RolesUsuarios } from './core/interfaces/enums';
import { Selecciones } from './views/selecciones/selecciones';

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
                component: Modulos,
                canActivate: [ngxPermissionsGuard],
                data: {
                    permissions: {
                        only: [
                            RolesUsuarios.ADMINISTRADOR,
                            RolesUsuarios.AUDITOR,
                        ],
                    },
                },
                resolve: {
                    modulos: modulosResolver,
                },
            },
            {
                path: 'secciones',
                component: Secciones,
                canActivate: [ngxPermissionsGuard],
                data: {
                    permissions: {
                        only: [
                            RolesUsuarios.ADMINISTRADOR,
                            RolesUsuarios.AUDITOR,
                        ],
                    },
                },
                resolve: {
                    secciones: seccionesResolver,
                },
            },
            {
                path: 'opciones',
                component: Opciones,
                resolve: {
                    opciones: opcionesResolver,
                },
            },
            {
                path: 'selecciones',
                component: Selecciones,
                resolve: {
                    seleccion: seleccionesResolver,
                },
            },
            { path: '**', redirectTo: 'modulos' },
        ],
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
