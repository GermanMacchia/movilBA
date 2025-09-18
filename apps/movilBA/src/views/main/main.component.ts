import { AsyncPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { logout, selectSessionUsuario } from '@movil-ba/data-access'
import { DrawerComponent } from '@movilBA/ui'
import { Store } from '@ngrx/store'

@Component({
	selector: 'app-main',
	imports: [RouterOutlet, DrawerComponent, AsyncPipe],
	templateUrl: './main.component.html',
	host: {
		class: 'flex',
	},
})
export class MainComponent {
	private store$ = inject(Store)
	usuario = this.store$.select(selectSessionUsuario)
	

	sidebarOpen = (isOpen: string) => {
		if (isOpen) {
			document.getElementById('main-router')?.classList.remove('router-shell')
			document.getElementById('inner-router')?.classList.add('mt-[3.5rem]')
			return
		}
		document.getElementById('main-router')?.classList.add('router-shell')
		document.getElementById('inner-router')?.classList.remove('mt-[3.5rem]')
	}

	handleLogout = () => this.store$.dispatch(logout())
}
