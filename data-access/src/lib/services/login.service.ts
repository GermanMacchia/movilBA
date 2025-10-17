import { Injectable } from '@angular/core'
import { Validators } from '@angular/forms'
import type { LoginData } from '../interfaces/interfaces'
import { login } from '../store'
import { FormHandler } from './form-handler'

@Injectable()
export class LoginService extends FormHandler {
	data: LoginData = {
		input: {
			label: 'Cuil',
			formControlName: 'cuil',
			placeholder: 'Ingresar Cuil',
		},
		password: {
			label: 'Clave',
			formControlName: 'password',
			placeholder: 'Ingresar Clave',
		},
	}

	constructor() {
		super()
		this.form = this.fb.group({
			cuil: ['', Validators.required],
			password: ['', Validators.required],
		})
	}

	login = () => {
		console.log('antes')
		if (!this.isFormValid) return

		console.log('despacho')
		this.store$.dispatch(login(this.formValue))
	}
}
