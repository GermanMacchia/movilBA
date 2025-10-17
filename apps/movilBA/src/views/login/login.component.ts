import { AsyncPipe, Location } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
	LoginService,
	selectLoginError,
	selectLoginLoading,
	selectSession,
} from '@movil-ba/data-access'
import { LoginCardComponent, ToastComponent, ToastService } from '@movilBA/ui'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { filter } from 'rxjs'

@UntilDestroy()
@Component({
	selector: 'app-login',
	imports: [LoginCardComponent, AsyncPipe, ToastComponent],
	providers: [LoginService, ToastService],
	templateUrl: './login.component.html',
	styles: `
		#background-image {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			filter: opacity(0.5);
			z-index: -1;
		}
	`,
	host: {
		class: 'flex flex-col h-screen items-center justify-center',
	},
})
export class LoginComponent implements OnInit {
	loginService = inject(LoginService)
	toastService = inject(ToastService)
	location = inject(Location)
	bgUrl = ''
	store$ = inject(Store)
	router = inject(Router)
	loading$ = this.store$.select<boolean>(selectLoginLoading)

	ngOnInit(): void {
		//desde sass servidor redirige a ip/assets
		this.bgUrl = this.location.prepareExternalUrl('assets/login-background.jpg')
		this.store$
			.select(selectSession)
			.pipe(
				filter(ele => !!ele),
				untilDestroyed(this),
			)
			.subscribe(() => this.router.navigate(['']))

		this.store$
			.select(selectLoginError)
			.pipe(
				filter(ele => !!ele),
				untilDestroyed(this),
			)
			.subscribe(error => {
				this.toastService.toast({
					body:
						error.statusCode === 401
							? 'Datos invalidos'
							: error.statusCode === 429
								? `Demasiadas peticiones. Intente más tarde`
								: error.message,
					severity: error.statusCode === 401 ? 'warning' : 'error',
				})
			})
	}
}
