import {
	AfterViewInit,
	Component,
	ElementRef,
	ViewChild,
	inject,
} from '@angular/core'
import { filter, finalize } from 'rxjs'
import { InfoModalService } from './info-modal.service'

@Component({
	selector: 'lib-info-modal',
	templateUrl: './info-modal.component.html',
})
export class InfoModalComponent implements AfterViewInit {
	service = inject(InfoModalService)

	@ViewChild('dialog')
	dialog!: ElementRef<HTMLDialogElement>

	ngAfterViewInit(): void {
		this.service.modalVisible
			.pipe(filter(ele => ele))
			.subscribe(() => this.dialog.nativeElement.showModal())
		//gestionando aqui evito que se vacie el modal antes de que cierre
		this.service.modalVisible
			.pipe(
				finalize(() => this.service.reset()),
				filter(ele => !ele),
			)
			.subscribe(() => this.dialog.nativeElement.close())
	}
}
