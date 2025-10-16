import { AsyncPipe } from '@angular/common'
import { Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { AuthService, logout, selectSession } from '@movil-ba/data-access'
import { DrawerComponent, InfoModalComponent } from '@movilBA/ui'
import { Store } from '@ngrx/store'
import { filter } from 'rxjs'

type BreadCrumb = { label: string; url: string }

@Component({
	selector: 'app-main',
	imports: [RouterOutlet, DrawerComponent, AsyncPipe, InfoModalComponent],
	templateUrl: './main.component.html',
	host: {
		class: 'flex',
	},
})
export class MainComponent implements OnInit {
	private store$ = inject(Store)
	private activatedRoute = inject(ActivatedRoute)
	private router = inject(Router)
	authService = inject(AuthService)
	usuario = this.store$.select(selectSession)
	paths = signal<BreadCrumb[]>([])

	ngOnInit(): void {
		this.buildBreadCrumb(this.activatedRoute.root)
		this.subscribePaths()
	}

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

	private subscribePaths() {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => this.buildBreadCrumb(this.activatedRoute.root))
	}

	private buildBreadCrumb(
		activatedRoute: ActivatedRoute,
		url: string = '',
		breadcumbs: BreadCrumb[] = [{ label: 'Inicio', url: '' }],
	): void {
		for (let idx = 0; idx < activatedRoute.children.length; idx++) {
			const snapshot = activatedRoute.children[idx].snapshot
			const routeUrl = snapshot.url.map(segment => segment.path).join('/')

			if (routeUrl) {
				url += `/${routeUrl}`
				breadcumbs.push({ label: routeUrl, url: url })
			}

			return this.buildBreadCrumb(activatedRoute.children[idx], url, breadcumbs)
		}

		this.paths.set(breadcumbs)
	}
}
