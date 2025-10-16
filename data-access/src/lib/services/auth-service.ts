/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { NgxPermissionsService } from 'ngx-permissions'
import { RolesUsuarios } from '../interfaces/enums'

export const ACCESS_VALUES = 'access_values'

@Injectable({ providedIn: 'root' })
export class AuthService {
	private router = inject(Router)
	private store$ = inject(Store)
	private ngxPermissionsService = inject(NgxPermissionsService)
	isPermissionGranted = signal<boolean>(false)

	constructor() {
		this.setDataOnReload()
	}

	logout = () => {
		this.flushPermission()
		location.reload()
	}

	setSession = (session: any) => {
		this.isPermissionGranted.set(true)
		sessionStorage.setItem(ACCESS_VALUES, JSON.stringify(session))
		// this.redirectByRol(auth.usuario.rol);
		// this.ngxPermissionsService.addPermission(auth.usuario.rol);
	}

	setDataOnReload = () => {
		const auth = sessionStorage.getItem(ACCESS_VALUES)

		if (!auth) return

		this.setSession(JSON.parse(auth))
		// this.store$.dispatch(dataEffects.setData({ data: JSON.parse(data) }));
		// this.store$.dispatch(
		//     loginEffects.setUsuario({ usuario: JSON.parse(auth).usuario })
		// );
	}

	redirectByRol = (rol: string) => {
		switch (rol) {
			case RolesUsuarios.ADMINISTRADOR:
				this.router.navigate(['/modulos'])
				return
			case RolesUsuarios.AUDITOR:
				this.router.navigate(['/modulos'])
				return
			case RolesUsuarios.OPERADOR:
				this.router.navigate(['/opciones'])
				return
			default:
				this.router.navigate([''])
				return
		}
	}

	flushPermission = () => {
		this.isPermissionGranted.set(false)
		this.ngxPermissionsService.flushPermissions()
		sessionStorage.removeItem(ACCESS_VALUES)
	}
}
