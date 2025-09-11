import { Component, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AuthService, logout } from '@movil-ba/data-access'
import { DrawerComponent } from '@movilBA/ui'
import { Store } from '@ngrx/store'

@Component({
	selector: 'app-main',
	imports: [RouterOutlet, DrawerComponent],
	templateUrl: './main.component.html',
	host: {
		class: 'flex',
	},
})
export class MainComponent {
	private store$ = inject(Store)
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
