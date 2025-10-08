import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type FormGroup } from '@angular/forms';

export type LoginInfo = { label: string, formControlName: string, placeholder: string }
export type LoginData = { input: LoginInfo, password: LoginInfo }

@Component({
  selector: 'lib-login-card',
  imports: [ReactiveFormsModule],
  templateUrl: './login-card.component.html',
  styles: `
    :host ::ng-deep .input {
        &:focus,
        &:focus-within {
          --input-color: orange;
            outline: none;
        }
    }
    :host ::ng-deep .card-body {
      gap:0;
      padding-top: 0;
    }
  `
})
export class LoginCardComponent {
  loading = input<boolean>(false)
  formgroup = input.required<FormGroup>()
  data = input.required<LoginData>()
  action = input.required<() => void>()
}
