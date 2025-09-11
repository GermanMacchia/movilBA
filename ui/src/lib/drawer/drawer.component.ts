import {
	AfterViewInit,
	Component,
	ElementRef,
	input,
	model,
	ViewChild,
} from '@angular/core'
import { TitleCasePipe } from '@angular/common'

export const theme_value = 'theme_value'

@Component({
	selector: 'lib-drawer',
	imports: [TitleCasePipe],
	styleUrl: '../styles.scss',
	templateUrl: './drawer.component.html',
})
export class DrawerComponent implements AfterViewInit {
	logout = input.required<() => void>()
	usuario = input<string>()
	rol = input<string>()
	items = input<{ label: string; routerLink: string; icon: string }[]>()
	themes = input.required<{ dark: string; light: string }>()
	appname = input<string>()
	paths = input<{ label: string; routerLink: string }[]>([])

	open = model<string>('drawer-open')
	toggleDrawer = () => this.open.update(open => (open ? '' : 'drawer-open'))

	@ViewChild('themeCheck') themeCheck!: ElementRef<HTMLInputElement>

	ngAfterViewInit(): void {
		this.checkTheme()
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
		console.log(this.themeCheck.nativeElement)
		document
			.getElementsByTagName('html')[0]
			.setAttribute('data-theme', this.themes().dark)
		this.themeCheck.nativeElement.checked = true
	}
}
