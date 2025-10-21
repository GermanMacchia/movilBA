import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
	selector: 'app-error',
	imports: [],
	templateUrl: './error.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
	title = 'Error'
	body = 'Error de datos'

	constructor(private router: Router) {
		const state = this.router.getCurrentNavigation()?.extras.state
		if (state) {
			this.title = state['title']
			this.body = state['body']
		} else {
			// Si el usuario refresca la página, el state se pierde
			const savedState = history.state
			this.title = savedState.title || 'Error'
			this.body = savedState.body || 'Ocurrió un problema'
		}
	}
}
