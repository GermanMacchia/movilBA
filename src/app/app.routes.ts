import {Routes} from '@angular/router';
import {Login} from '@src/app/views/login/login';

export const routes: Routes = [
    {path: '', component: Login},
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
