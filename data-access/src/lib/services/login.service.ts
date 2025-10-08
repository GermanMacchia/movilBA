
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { login } from '../store';
import { FormHandler } from './form-handler';

export type LoginInfo = { label: string, formControlName: string, placeholder: string }
export type LoginData = { input: LoginInfo, password: LoginInfo }

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
      password: ['', Validators.required]
    })
  }

  login = () => {
    if (!this.isFormValid) return
    this.store$.dispatch(login(this.formValue))
  }
}
