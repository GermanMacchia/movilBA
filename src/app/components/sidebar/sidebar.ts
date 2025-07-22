import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {DrawerModule} from 'primeng/drawer';
import {MenuModule} from 'primeng/menu';
import {AppService} from '@src/app/core/services/app-service';
import {AuthService} from '@src/app/core/services/auth-service';
import {selectUsuario} from '@src/app/core/store/selectors';
import {Store} from '@ngrx/store';
import {Usuario} from '@interfaces';
import {take} from 'rxjs';

@Component({
    selector: 'app-sidebar',
    imports: [DrawerModule, ButtonModule, MenuModule],
    templateUrl: './sidebar.html',
    host: {
        class: 'bg-ui'
    },
})
export class Sidebar implements OnInit {
    public appService = inject(AppService);
    private authService = inject(AuthService);
    private store$ = inject(Store);

    menuItems: { label: string, icon: string, command: () => void }[] | undefined;

    ngOnInit() {
        this.store$.select(selectUsuario).pipe(take(1)).subscribe( (usuario: Usuario | null) => {
            if (!usuario) return

            this.menuItems = [
                {
                    label: 'Inicio',
                    icon: 'pi pi-home',
                    command: () => this.authService.redirectByRol(usuario.rol)
                },
                {
                    label: usuario.nombre,
                    icon: 'pi pi-user',
                    command: () => console.log()
                },
                {label: 'Salir', icon: 'pi pi-sign-out', command: () => this.authService.logout()},
            ];

        });
    }
}
