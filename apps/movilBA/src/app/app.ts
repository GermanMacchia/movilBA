import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
	imports: [RouterModule],
	selector: 'app-root',
	template: `
		<div id="main-router">
			<router-outlet></router-outlet>
		</div>
	`,
	styleUrl: '../styles.scss',
})
export class App {
	protected title = 'movilBA'
}
