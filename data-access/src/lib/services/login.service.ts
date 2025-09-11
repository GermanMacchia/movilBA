
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { login } from '../store';
import { FormHandler } from './form-handler';

@Injectable()
export class LoginService extends FormHandler {

  constructor() {
    super()
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login = () => {
    if (!this.isFormValid) return
    this.store$.dispatch(login(this.formValue))
  }
}
