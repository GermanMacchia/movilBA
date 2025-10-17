import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	OnInit,
	signal,
	ViewChild,
} from '@angular/core'
import { ToastService } from './toast.service'

@Component({
	selector: 'lib-toast',
	template: `
		@if (visible()) {
			<div
				role="alert"
				class="alert alert-soft toast toast-top toast-center"
				[class]="service.data.severity">
				<i [class]="service.data.icon" style="font-size: 2rem;"></i>
				<div class="flex flex-col gap-2">
					@if (service.data.title) {
						<p class="font-semibold text-xl">
							{{ service.data.title }}
						</p>
					}
					<p class="whitespace-pre-wrap text-lg font-medium">
						{{ service.data.body }}
					</p>
				</div>
			</div>
		}
	`,
})
export class ToastComponent implements OnInit {
	service = inject(ToastService)
	visible = signal<boolean>(false)

	ngOnInit(): void {
		this.service.thrigger.subscribe(() => this.show())
	}

	show() {
		this.visible.set(true)
		setTimeout(() => this.visible.set(false), 3000)
	}
}
