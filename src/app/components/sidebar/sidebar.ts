import { Component, inject, OnInit, signal } from '@angular/core';
import { Usuario } from '@interfaces';
import { Store } from '@ngrx/store';
import { RolesUsuarios } from '@src/app/core/interfaces/enums';
import { AppService } from '@src/app/core/services/app-service';
import { AuthService } from '@src/app/core/services/auth-service';
import { selectUsuario } from '@src/app/core/store/selectors';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { take } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    imports: [DrawerModule, ButtonModule, MenuModule, NgxPermissionsModule],
    templateUrl: './sidebar.html',
    host: {
        class: 'bg-ui',
    },
})
export class Sidebar implements OnInit {
    public appService = inject(AppService);
    private authService = inject(AuthService);
    private store$ = inject(Store);
    rolesUsuarios = RolesUsuarios;
    menuItems = signal<{ label: string; icon: string; command: () => void }[]>(
        []
    );

    ngOnInit() {
        this.store$
            .select(selectUsuario)
            .pipe(take(1))
            .subscribe((usuario: Usuario | null) => {
                if (!usuario) return;

                this.menuItems.set([
                    {
                        label: 'Inicio',
                        icon: 'home',
                        command: () =>
                            this.authService.redirectByRol(usuario.rol),
                    },
                    {
                        label: usuario.nombre,
                        icon: 'account_circle',
                        command: () => {},
                    },
                    {
                        label: 'Salir',
                        icon: 'logout',
                        command: () => this.authService.logout(),
                    },
                ]);
            });
    }
}
