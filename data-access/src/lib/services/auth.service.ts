import { inject, Injectable, signal } from '@angular/core'
import { InfoModalService } from '@movilBA/ui'
import { Store } from '@ngrx/store'
import { NgxPermissionsService } from 'ngx-permissions'
import { catchError, finalize, of } from 'rxjs'
import { AuthApiService } from '../api/auth-api-service'
import { Permisos } from '../interfaces'
import { loginSuccess } from '../store'

export const SESSION = 'session'

@Injectable({ providedIn: 'root' })
export class AuthService {
	private store$ = inject(Store)
	private authApiService = inject(AuthApiService)
	private ngxPermissionsService = inject(NgxPermissionsService)
	public ranked = signal<string>('Auditor')
	public isPermissionGranted = signal<boolean>(false)
	private infoModalService = inject(InfoModalService)

	constructor() {
		this.setDataOnReload()
	}

	setSession = (session: any) => {
		this.isPermissionGranted.set(true)
		sessionStorage.setItem(SESSION, JSON.stringify(session))
		const permissions = this.translatePermissions(session.permisos)
		this.ngxPermissionsService.addPermission(permissions);
	}

	refresh = () => this.authApiService.refresh()
		.pipe(catchError(error => {
			this.infoModalService.openModal(
				'Sesión Finalizada',
				`La sesión actual ha caducado y no pudo ser renovada. 
				Por favor ingrese sus credenciales nuevamente.`,
				'warn',
				() => this.resetpermissions()
			)
			return of(error)
		})).subscribe()

	logout = () =>
		this.authApiService.logout().pipe(
			finalize(() => this.resetpermissions())
		).subscribe()

	resetpermissions() {
		sessionStorage.clear()
		this.isPermissionGranted.set(false)
		this.flushPermission()
		location.reload()
	}

	setDataOnReload = () => {
		const session = sessionStorage.getItem(SESSION)

		if (!session) return

		this.setSession(JSON.parse(session))
		this.store$.dispatch(loginSuccess({ data: JSON.parse(session) }));
	}

	flushPermission = () => {
		this.isPermissionGranted.set(false)
		this.ngxPermissionsService.flushPermissions()
		sessionStorage.removeItem(SESSION)
	}

	//-- bitmask: read=0001, write=0010, create=0100, delete=1000
	// 1111 Administrado, 0111 Editor, 0011 Operador, 0001 Auditor
	translatePermissions = (permisos: Permisos[]) => {
		const permissions = []
		let ranked = 'Auditor'
		const pArray = ['DELETE', 'CREATE', 'WRITE', 'READ']
		const rArray = ['Administrador', 'Editor', 'Operador', 'Auditor']

		for (let x = 0; x < permisos.length; x++) {
			const module = permisos[x].modulo.nombre.toUpperCase();
			for (let y = 0; y < pArray.length; y++) {
				const hasPermission = permisos[x].permisos.toString().charAt(y);
				if (!hasPermission) continue

				permissions.push(`${module}.${pArray[y]}`)
				if (y < rArray.indexOf(ranked))
					ranked = rArray[y]
			}
		}
		this.ranked.set(ranked)
		return permissions
	}
}
