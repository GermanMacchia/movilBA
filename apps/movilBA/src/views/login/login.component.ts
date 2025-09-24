import { AsyncPipe } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
	getCrsf,
	LoginService,
	selectLoginLoading,
	selectSessionAuthenticated,
} from '@movil-ba/data-access'
import { LoginCardComponent, LoginData } from '@movilBA/ui'
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
    background-image: url('assets/login-background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: opacity(.5); // desenfoque + oscurecimiento
    z-index: -1; // se pone detrás del contenido
}`,
	host: {
		class: 'flex flex-col h-screen items-center justify-center',
	},
})
export class LoginComponent implements OnInit {
	loginService = inject(LoginService)

	store$ = inject(Store)
	router = inject(Router)
	loading$ = this.store$.select<boolean>(selectLoginLoading)

	data: LoginData = {
		input: {
			label: 'Email',
			formControlName: 'email',
			placeholder: 'Ingresar Email',
		},
		password: {
			label: 'Clave',
			formControlName: 'password',
			placeholder: 'Ingresar Clave',
		},
	}

	ngOnInit(): void {
		this.store$.dispatch(getCrsf())
		this.store$
			.select(selectSessionAuthenticated)
			.subscribe((isAuthenticated) =>
				isAuthenticated ? this.router.navigate(['']) : null
			)
	}
}
