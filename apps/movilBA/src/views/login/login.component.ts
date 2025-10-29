import { AsyncPipe, Location } from '@angular/common'
import { AfterContentInit, Component, inject, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'
import {
	LoginService,
	selectLoginError,
	selectLoginLoading,
	selectSession,
	selectOperative,
	health,
} from '@movil-ba/data-access'
import { LoginCardComponent, ToastComponent, ToastService } from '@movilBA/ui'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from '@ngrx/store'
import { delay, filter, tap } from 'rxjs'

@UntilDestroy()
@Component({
	selector: 'app-login',
	imports: [LoginCardComponent, AsyncPipe, ToastComponent],
	providers: [LoginService, ToastService],
	templateUrl: './login.component.html',
	styles: `
		.loader {
			width: 8rem;
			aspect-ratio: 1;
			border-radius: 50%;
			background:
				radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat,
				conic-gradient(#0000 30%, #ffa516);
			-webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
			animation: l13 1s infinite linear;
		}
		@keyframes l13 {
			100% {
				transform: rotate(1turn);
			}
		}
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
export class LoginComponent implements OnInit, AfterContentInit {
	loginService = inject(LoginService)
	toastService = inject(ToastService)
	location = inject(Location)
	bgUrl = ''
	store$ = inject(Store)
	router = inject(Router)
	loading$ = this.store$.select<boolean>(selectLoginLoading)
	isOperative = signal<boolean>(false)

	ngOnInit(): void {
		//desde sass servidor redirige a ip/assets
		this.bgUrl = this.location.prepareExternalUrl('assets/login-background.jpg')
		this.subscribeLoginError()
		this.subscribeOnSession()
		this.subscribeOnHealthError()
	}

	ngAfterContentInit(): void {
		this.store$.dispatch(health())
	}

	private subscribeOnHealthError() {
		this.store$
			.select(selectOperative)
			.pipe(
				filter(ele => ele !== null),
				delay(750),
				untilDestroyed(this),
			)
			.subscribe(operative =>
				operative
					? this.isOperative.set(true)
					: this.router.navigate(['error'], {
							state: {
								title: 'Fuera de servicio',
								body: 'Lamentamos informar que la aplicacion se encuentra momentáneamente fuera de servicio.\nPor favor, pruebe más tarde.',
							},
						}),
			)
	}

	private subscribeOnSession() {
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

	private subscribeLoginError() {
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

	private subscribeLoginError() {
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
