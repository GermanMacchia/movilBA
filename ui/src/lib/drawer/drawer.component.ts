import { CommonModule, TitleCasePipe } from '@angular/common'
import {
	AfterViewInit,
	Component,
	ElementRef,
	inject,
	input,
	model,
	OnChanges,
	OnInit,
	signal,
	SimpleChanges,
	ViewChild,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NgxPermissionsModule } from 'ngx-permissions'
import { FormsModule } from '@angular/forms'

export const theme_value = 'theme_value'

@Component({
	selector: 'lib-drawer',
	imports: [TitleCasePipe, NgxPermissionsModule, RouterLink, FormsModule],
	styleUrl: '../styles.scss',
	templateUrl: './drawer.component.html',
})
export class DrawerComponent implements OnInit, OnChanges {
	router = inject(Router)
	logout = input.required<() => void>()
	usuario = input<string>()
	rol = input<string>()
	themeCheck = false
	items = input<
		{
			label: string
			routerLink: string
			icon: string
			only?: string
			except?: string
		}[]
	>()
	themes = input.required<{ dark: string; light: string }>()
	appname = input<string>()
	paths = input<{ label: string; url: string }[]>([])
	hideOnRoute = input(false)

	open = model<string>('drawer-open')
	toggleDrawer = () => this.open.update(open => (open ? '' : 'drawer-open'))

	ngOnInit(): void {
		this.checkTheme()
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.hideOnRoute() && changes['paths'].currentValue.length !== 1)
			this.open.set('')

		if (this.hideOnRoute() && changes['paths'].currentValue.length === 1)
			this.open.set('drawer-open')
	}

	back = () => {
		const items = this.paths()
		items.pop()
		this.router.navigate([items.pop()?.url])
	}

	changeTheme = () => {
		const html = document.getElementsByTagName('html')[0]

		const theme = html.getAttribute('data-theme')
		const swithed =
			theme === this.themes().light ? this.themes().dark : this.themes().light

		document.getElementsByTagName('html')[0].setAttribute('data-theme', swithed)
		localStorage.setItem(theme_value, swithed)
	}

	private checkTheme() {
		const theme = localStorage.getItem(theme_value)

		if (!theme || theme === this.themes().light) return

		document
			.getElementsByTagName('html')[0]
			.setAttribute('data-theme', this.themes().dark)

		this.themeCheck = true
	}
}
