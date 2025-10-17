import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

export type Severity =
	| 'warning'
	| 'info'
	| 'error'
	| 'success'
	| 'accent'
	| 'neutral'
	| 'primary'
	| 'secondary'

export type ToastData = {
	severity: string
	body: string
	title?: string
	duration?: number
	icon?: string
}

const SeverityClass = {
	warning: 'alert-warning',
	info: 'alert-info',
	error: 'alert-error',
	success: 'alert-success',
	accent: 'alert-accent',
	neutral: 'alert-neutral',
	primary: 'alert-primary',
	secondary: 'alert-secondary',
}

const SeverityIcon = {
	warning: 'bi bi-exclamation-triangle',
	info: 'bi bi-info-circle',
	error: 'bi bi-exclamation-diamond',
	success: 'bi bi-check-circle',
	accent: 'bi bi-exclamation-circle',
	neutral: 'bi bi-exclamation-circle',
	primary: 'bi bi-exclamation-circle',
	secondary: 'bi bi-exclamation-circle',
}

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	data: ToastData = {
		title: '',
		body: '',
		severity: 'info',
		duration: 7000,
		icon: '',
	}

	thrigger = new Subject<void>()

	constructor() {}

	/**
	 * Para setear el toast.
	 * @param title opcional
	 * @param body
	 * @param severity
	 * @param duration default 7000 ms
	 */
	toast(data: ToastData) {
		this.data.body = data.body
		this.data.title = data.title ?? ''
		this.data.severity = (SeverityClass as any)[data.severity]
		this.data.duration = data.duration ?? 7000
		this.data.icon = data.icon ?? (SeverityIcon as any)[data.severity]
		this.thrigger.next()
	}
}
