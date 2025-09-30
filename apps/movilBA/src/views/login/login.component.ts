import { AsyncPipe, Location } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
	getCrsf,
	LoginService,
	selectLoginLoading,
	selectSessionAuthenticated,
} from '@movil-ba/data-access'
import { LoginCardComponent } from '@movilBA/ui'
import { Store } from '@ngrx/store'

@Component({
	selector: 'app-login',
	imports: [LoginCardComponent, AsyncPipe],
	providers: [LoginService],
	templateUrl: './login.component.html',
	styles: `
  #background-image{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: opacity(.5); 
    z-index: -1; 
}`,
	host: {
		class: 'flex flex-col h-screen items-center justify-center',
	},
})
export class LoginComponent implements OnInit {
	loginService = inject(LoginService)
	location = inject(Location)
	bgUrl = ''
	store$ = inject(Store)
	router = inject(Router)
	loading$ = this.store$.select<boolean>(selectLoginLoading)

	ngOnInit(): void {
		//desde sass servidor redirige a ip/assets
		this.bgUrl = this.location.prepareExternalUrl('assets/login-background.jpg');
		this.store$.dispatch(getCrsf())
		this.store$
			.select(selectSessionAuthenticated)
			.subscribe((isAuthenticated) =>
				isAuthenticated ? this.router.navigate(['']) : null
			)
	}
}
