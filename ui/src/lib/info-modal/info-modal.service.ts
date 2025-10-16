import { Injectable, signal } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

const EMPTY_INFO = {
	showCancel: false,
	title: '',
	body: '',
	icon: '',
	severityClass: '',
}

@Injectable({ providedIn: 'root' })
export class InfoModalService {
	modalVisible = new BehaviorSubject<boolean>(false)
	modalInfo = signal(EMPTY_INFO)

	private severityInfo = {
		info: 'border-[.5rem] border-blue-200',
		error: 'border-[.5rem] border-red-200',
		warn: 'border-[.5rem] border-yellow-200',
		success: 'border-[.5rem] border-green-200',
	}

	onCancel: () => void = () => {}
	onAccept: () => void = () => {}

	openModal(
		title: string,
		body: string,
		severity: 'info' | 'warn' | 'error' | 'success',
		onAccept: () => void,
		onCancel?: () => void,
	) {
		this.modalInfo.set({
			showCancel: onCancel ? true : false,
			title,
			body,
			icon:
				severity === 'warn'
					? 'bi bi-exclamation-diamond'
					: severity === 'info'
						? 'bi bi-info-circle'
						: severity === 'error'
							? 'bi bi-exclamation-octagon'
							: 'bi bi-check-circle',
			severityClass: this.severityInfo[severity],
		})

		this.onAccept = onAccept
		if (onCancel) this.onCancel = onCancel

		this.modalVisible.next(true)
	}

	handleAccept = () => {
		this.onAccept()
	}

	handleCancel = () => {
		this.onCancel()
	}

	reset() {
		this.modalVisible.next(false)

		this.onCancel = () => {}
		this.onAccept = () => {}

		this.modalInfo.set(EMPTY_INFO)
	}
}
