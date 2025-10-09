import { TitleCasePipe } from '@angular/common'
import {
	AfterViewInit,
	Component,
	ElementRef,
	inject,
	input,
	model,
	ViewChild,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NgxPermissionsModule } from 'ngx-permissions'

export const theme_value = 'theme_value'

@Component({
	selector: 'lib-drawer',
	providers: [],
	imports: [TitleCasePipe, NgxPermissionsModule, RouterLink],
	styleUrl: '../styles.scss',
	templateUrl: './drawer.component.html',
})
export class DrawerComponent implements AfterViewInit {
	router = inject(Router)
	logout = input.required<() => void>()
	usuario = input<string>()
	rol = input<string>()
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

	open = model<string>('drawer-open')
	toggleDrawer = () => this.open.update(open => (open ? '' : 'drawer-open'))

	@ViewChild('themeCheck') themeCheck!: ElementRef<HTMLInputElement>

	ngAfterViewInit(): void {
		this.checkTheme()
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
		this.themeCheck.nativeElement.checked = true
	}
}
