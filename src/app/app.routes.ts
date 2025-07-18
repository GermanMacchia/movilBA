import { Routes } from '@angular/router';
import { AppGuard } from '@src/app/core/guards/auth.guard';
import { LoginGuard } from '@src/app/core/guards/login.guard';
import { Home } from '@src/app/views/home/home';
import { Login } from '@src/app/views/login/login';
import { ModulosAdmin } from '@src/app/views/modulos-admin/modulos-admin';
import { Opciones } from '@src/app/views/opciones/opciones';

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
            { path: 'opciones', component: Opciones },
            { path: 'modulos', component: ModulosAdmin },
            { path: '**', redirectTo: '' },
        ],
    },
    { path: '**', pathMatch: 'full', redirectTo: '' },
];
