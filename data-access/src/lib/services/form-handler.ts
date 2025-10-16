import { inject } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

export abstract class FormHandler {
	protected fb = inject(FormBuilder)
	protected form!: FormGroup
	protected store$ = inject(Store)

	get formGroup() {
		return this.form
	}

	get formValue() {
		return this.form.value
	}

	protected isFormValid = (): boolean => {
		if (this.form.valid) return true

		this.form.markAllAsTouched()

		return false
	}
}
