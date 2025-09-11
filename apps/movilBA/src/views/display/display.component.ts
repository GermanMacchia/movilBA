/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'

@Component({
	selector: 'app-display',
	imports: [RouterLink],
	templateUrl: './display.component.html',

})
export class DisplayComponent implements OnInit {
	activatedRoute = inject(ActivatedRoute)
	routes = signal<any>('')

	ngOnInit(): void {
		this.activatedRoute.data.subscribe(data => this.routes.set(data['modulos']))
	}
}
