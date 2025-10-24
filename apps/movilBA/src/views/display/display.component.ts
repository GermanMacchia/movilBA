import { Component, inject, OnInit, signal } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { ModulosRoutes } from 'data-access/src/lib/interfaces/interfaces'
import { NgxPermissionsModule } from 'ngx-permissions'

@Component({
	selector: 'app-display',
	imports: [RouterLink, NgxPermissionsModule],
	templateUrl: './display.component.html',
})
export class DisplayComponent implements OnInit {
	activatedRoute = inject(ActivatedRoute)
	routes = signal<ModulosRoutes[]>([])

	ngOnInit(): void {
		this.activatedRoute.data.subscribe(data => {
			this.routes.set(data['modulos'])
		})
	}
}
